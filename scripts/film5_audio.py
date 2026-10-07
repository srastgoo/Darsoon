"""Procedural audio for the DarsoonLaunch film (src/PromoV5).

Generates an original 120 BPM uplifting music bed and a kit of short SFX,
written as mp3 into public/v5/. Pure numpy + ffmpeg, no samples, so the
output is fully owned and license-free.

    python3 scripts/film5_audio.py

Music structure (1 bar = 2 s = 60 frames at 30 fps):
  bars 0-1   (0-4 s)    problem: muted plucks over Bm-G, ticking clock, riser
  bar  2     (4 s)      drop: kick, claps, bass, bright arp (solution reveal)
  bars 2-12  (4-26 s)   full groove, D-A-Bm-G with add9 colours
  bar  13    (26 s)     CTA: impact + open chord, groove thins out to the end
"""

import os
import subprocess
import tempfile

import numpy as np

SR = 44100
BPM = 120
BEAT = 60 / BPM
BAR = BEAT * 4
LENGTH = 31.0
OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "v5")

rng = np.random.default_rng(7)


def t_axis(dur):
    return np.arange(int(dur * SR)) / SR


def midi_hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def env_adsr(n, a, d, s, r, sustain_time):
    t = np.arange(n) / SR
    e = np.zeros(n)
    e = np.where(t < a, t / max(a, 1e-4), e)
    dmask = (t >= a) & (t < a + d)
    e = np.where(dmask, 1 - (1 - s) * (t - a) / max(d, 1e-4), e)
    smask = (t >= a + d) & (t < sustain_time)
    e = np.where(smask, s, e)
    rmask = t >= sustain_time
    e = np.where(rmask, s * np.exp(-(t - sustain_time) / max(r, 1e-4)), e)
    return e


def fft_filter(x, lo=None, hi=None, sr=SR):
    """Brick-ish band filter with soft (raised-cosine) skirts in the FFT domain."""
    n = len(x)
    X = np.fft.rfft(x)
    f = np.fft.rfftfreq(n, 1 / sr)
    g = np.ones_like(f)
    if lo:
        g *= np.clip((f - lo * 0.7) / (lo * 0.3 + 1e-9), 0, 1)
    if hi:
        g *= np.clip((hi * 1.3 - f) / (hi * 0.3 + 1e-9), 0, 1)
    return np.fft.irfft(X * g, n)


def additive(freq, dur, harmonics=8, rolloff=1.0, detune=0.0, phase_rand=True):
    t = t_axis(dur)
    out = np.zeros_like(t)
    for h in range(1, harmonics + 1):
        ph = rng.uniform(0, 2 * np.pi) if phase_rand else 0
        out += np.sin(2 * np.pi * freq * h * (1 + detune) * t + ph) / (h**rolloff)
    return out


def place(buf, sig, at, gain=1.0):
    i = int(at * SR)
    if i >= len(buf):
        return
    j = min(len(buf), i + len(sig))
    buf[i:j] += sig[: j - i] * gain


def reverb(x, seconds=1.8, mix=0.25, predelay=0.012):
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir = rng.standard_normal(n) * np.exp(-t * 6.5 / seconds)
    ir = fft_filter(ir, lo=200, hi=7000)
    ir[: int(predelay * SR)] = 0
    ir /= np.sqrt(np.sum(ir**2))
    size = len(x) + n
    nfft = 1 << (size - 1).bit_length()
    wet = np.fft.irfft(np.fft.rfft(x, nfft) * np.fft.rfft(ir, nfft), nfft)[: len(x)]
    return x * (1 - mix) + wet * mix * 1.4


# --------------------------------------------------------------------------- music voices


def pluck(freq, dur=0.45, bright=10):
    t = t_axis(dur)
    sig = np.zeros_like(t)
    for h in range(1, bright + 1):
        sig += np.sin(2 * np.pi * freq * h * t) / h * np.exp(-t * (6 + h * 2.2))
    sig *= np.minimum(t / 0.003, 1)
    return sig


def bell(freq, dur=1.2):
    t = t_axis(dur)
    partials = [(1, 1.0, 3.0), (2.0, 0.45, 4.5), (2.76, 0.3, 6), (5.4, 0.15, 9), (8.93, 0.07, 12)]
    sig = sum(a * np.sin(2 * np.pi * freq * r * t) * np.exp(-t * d) for r, a, d in partials)
    return sig * np.minimum(t / 0.002, 1)


def pad(freqs, dur, attack=0.35, release=0.5):
    n = int(dur * SR)
    out = np.zeros(n)
    for f in freqs:
        for det in (-0.004, 0.0, 0.0045):
            out += additive(f, dur, harmonics=7, rolloff=1.35, detune=det)
    e = env_adsr(n, attack, 0.3, 0.85, release, dur - release)
    return out * e / (len(freqs) * 3)


def kick(dur=0.42):
    t = t_axis(dur)
    f = 45 + 110 * np.exp(-t * 28)
    ph = 2 * np.pi * np.cumsum(f) / SR
    body = np.sin(ph) * np.exp(-t * 7.5)
    click = rng.standard_normal(len(t)) * np.exp(-t * 300) * 0.25
    return np.tanh((body + click) * 1.6)


def clap(dur=0.3):
    t = t_axis(dur)
    noise = fft_filter(rng.standard_normal(len(t)), lo=900, hi=6000)
    e = np.zeros_like(t)
    for k, off in enumerate((0, 0.011, 0.022)):
        e += np.where(t >= off, np.exp(-(t - off) * (180 if k < 2 else 22)), 0)
    return noise * e * 0.55


def hat(dur=0.06, open_=False):
    t = t_axis(0.25 if open_ else dur)
    noise = fft_filter(rng.standard_normal(len(t)), lo=7000)
    return noise * np.exp(-t * (14 if open_ else 70)) * 0.35


def bass(freq, dur):
    t = t_axis(dur)
    sig = np.sin(2 * np.pi * freq * t) + 0.35 * np.sin(2 * np.pi * freq * 2 * t) + 0.12 * np.sin(
        2 * np.pi * freq * 3 * t
    )
    n = len(t)
    return np.tanh(sig * 1.3) * env_adsr(n, 0.005, 0.12, 0.7, 0.06, dur - 0.06)


def tick_clock(dur=0.05):
    t = t_axis(dur)
    return np.sin(2 * np.pi * 2400 * t) * np.exp(-t * 160) * 0.5


# chords: (root midi for bass, chord tones for pad/arp)
D = (38, [62, 66, 69, 73, 76])  # Dmaj7(9)
A = (45, [61, 64, 69, 71, 76])  # A add9
Bm = (47, [62, 66, 69, 71, 74])  # Bm7
G = (43, [62, 67, 71, 74, 78])  # Gmaj7
Em = (40, [64, 67, 71, 74, 78])  # Em7

PROGRESSION = [Bm, G, D, A, Bm, G, D, A, Bm, G, Em, A, D, G, D, D]


def build_music():
    n = int(LENGTH * SR)
    drums = np.zeros(n)
    music = np.zeros(n)
    bassbus = np.zeros(n)
    sidechain = np.ones(n)

    for bar, (root, tones) in enumerate(PROGRESSION):
        t0 = bar * BAR
        if t0 >= 30:
            break
        intro = bar < 2
        outro = bar >= 13
        # pad
        pad_gain = 0.22 if intro else 0.3
        place(music, pad([midi_hz(m) for m in tones[:4]], BAR + 0.4), t0, pad_gain)

        # arp: 16th note plucks, muted in the intro (8ths)
        step = BEAT / (2 if intro else 4)
        pattern = [0, 2, 1, 3, 4, 2, 3, 1]
        k = 0
        s = 0.0
        while s < BAR - 1e-6:
            m = tones[pattern[k % len(pattern)]] + (0 if intro else 12 if k % 8 in (4,) else 0)
            g = 0.16 if intro else 0.13
            if not intro and k % 4 == 0:
                g *= 1.35
            place(music, pluck(midi_hz(m), 0.35, bright=6 if intro else 11), t0 + s, g)
            s += step
            k += 1

        if intro:
            for b in range(8):
                place(drums, tick_clock(), t0 + b * BEAT / 2, 0.45 if b % 2 == 0 else 0.25)
            continue

        # drums
        for b in range(4):
            tb = t0 + b * BEAT
            place(drums, kick(), tb, 0.95)
            i = int(tb * SR)
            dk = int(0.22 * SR)
            if i < n:
                env = 1 - 0.55 * np.exp(-np.arange(min(dk, n - i)) / SR * 14)
                sidechain[i : i + len(env)] = np.minimum(sidechain[i : i + len(env)], env)
            if b in (1, 3) and not (outro and bar == 15):
                place(drums, clap(), tb, 0.8)
            place(drums, hat(open_=True), tb + BEAT / 2, 0.45)
            place(drums, hat(), tb + BEAT / 4, 0.3)
            place(drums, hat(), tb + 3 * BEAT / 4, 0.3)

        # bass: offbeat-ish pattern
        for b, (off, length) in enumerate([(0, 0.4), (0.75, 0.2), (1.5, 0.35), (2.5, 0.4), (3.25, 0.2), (3.5, 0.4)]):
            place(bassbus, bass(midi_hz(root), length * BEAT * 1.6), t0 + off * BEAT, 0.42)

    # bells on the CTA bar
    for i, m in enumerate([74, 78, 81, 86]):
        place(music, bell(midi_hz(m), 1.6), 26.0 + i * 0.125, 0.16)

    # riser into the drop (2.0 s -> 4.0 s)
    rdur = 1.9
    t = t_axis(rdur)
    noise = rng.standard_normal(len(t))
    riser = np.zeros_like(t)
    chunks = 24
    for c in range(chunks):
        a, b = c * len(t) // chunks, (c + 1) * len(t) // chunks
        lo = 400 + 5000 * (c / chunks) ** 2
        riser[a:b] = fft_filter(noise[a:b], lo=lo, hi=lo * 2.2)
    riser *= (t / rdur) ** 2 * 0.5
    place(music, riser, 4.0 - rdur, 1.0)

    music = reverb(music, 2.2, 0.3)
    mix = music * sidechain + bassbus * sidechain + drums * 0.9
    # fades
    tt = np.arange(n) / SR
    mix *= np.clip(tt / 0.15, 0, 1) * np.clip((30.0 - tt) / 1.2, 0, 1)
    mix = np.tanh(mix * 1.25)
    mix /= np.max(np.abs(mix)) + 1e-9
    return mix * 0.89


# --------------------------------------------------------------------------- sfx


def sfx_marker(dur=0.55):
    t = t_axis(dur)
    noise = fft_filter(rng.standard_normal(len(t)), lo=1500, hi=9000)
    strokes = 0.55 + 0.45 * np.abs(np.sin(2 * np.pi * 7.5 * t + rng.uniform(0, 3)))
    grain = 0.7 + 0.3 * rng.random(len(t))
    e = np.minimum(t / 0.02, 1) * np.clip((dur - t) / 0.08, 0, 1)
    return noise * strokes * grain * e * 0.6


def sfx_click():
    t = t_axis(0.06)
    s = np.sin(2 * np.pi * 3200 * t) * np.exp(-t * 220) + 0.6 * np.sin(2 * np.pi * 1100 * t) * np.exp(-t * 120)
    return s * 0.7


def sfx_pop():
    t = t_axis(0.18)
    f = 380 + 900 * (1 - np.exp(-t * 40))
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 26)
    return s * np.minimum(t / 0.002, 1) * 0.85


def sfx_whoosh(dur=0.5, up=True):
    t = t_axis(dur)
    noise = rng.standard_normal(len(t))
    out = np.zeros_like(t)
    chunks = 20
    for c in range(chunks):
        a, b = c * len(t) // chunks, (c + 1) * len(t) // chunks
        p = c / chunks if up else 1 - c / chunks
        lo = 300 + 3000 * p
        out[a:b] = fft_filter(noise[a:b], lo=lo, hi=lo * 2.5)
    e = np.sin(np.pi * np.clip(t / dur, 0, 1)) ** 1.6
    return out * e * 0.75


def sfx_impact():
    t = t_axis(1.6)
    f = 40 + 90 * np.exp(-t * 18)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 3.2)
    crack = fft_filter(rng.standard_normal(len(t)), lo=1500) * np.exp(-t * 30) * 0.5
    s = reverb(boom + crack, 1.5, 0.35)
    return np.tanh(s * 1.8) * 0.9


def sfx_ding():
    return (bell(midi_hz(88), 1.0) + 0.6 * bell(midi_hz(93), 1.0)) * 0.4


def sfx_coin():
    t = t_axis(0.35)
    a = np.sign(np.sin(2 * np.pi * 1975 * t)) * (t < 0.07)
    b = np.sign(np.sin(2 * np.pi * 2637 * t)) * (t >= 0.07)
    return fft_filter((a + b) * np.exp(-np.maximum(t - 0.07, 0) * 12), hi=8000) * 0.18


def sfx_tick():
    t = t_axis(0.03)
    return np.sin(2 * np.pi * 4200 * t) * np.exp(-t * 300) * 0.5


def sfx_thud():
    t = t_axis(0.35)
    f = 70 + 80 * np.exp(-t * 30)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 14)
    s += fft_filter(rng.standard_normal(len(t)), hi=1200) * np.exp(-t * 40) * 0.4
    return np.tanh(s * 1.5) * 0.8


def sfx_boing():
    t = t_axis(0.35)
    f = 220 + 160 * np.sin(2 * np.pi * 14 * t) * np.exp(-t * 8) + 120 * np.exp(-t * 10)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9) * 0.5


def sfx_swipe():
    return sfx_whoosh(0.28, up=False) * 0.9


def sfx_success():
    out = np.zeros(int(0.9 * SR))
    for i, m in enumerate([79, 83, 86, 91]):
        place(out, bell(midi_hz(m), 0.8), i * 0.06, 0.28)
    return out


def sfx_scratch():
    """Record scratch: a fast pitch-down sweep of filtered noise + tone."""
    t = t_axis(0.42)
    f = 1400 * np.exp(-t * 7) + 120
    tone = np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.35
    noise = fft_filter(rng.standard_normal(len(t)), lo=600, hi=5000) * 0.5
    wob = 0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 18 * t))
    return (tone + noise) * wob * np.exp(-t * 6) * 0.8


def sfx_crumple():
    """Paper being scrunched into a ball: bursts of crackly noise."""
    t = t_axis(0.5)
    out = np.zeros_like(t)
    for k in range(26):
        at = rng.uniform(0, 0.42)
        n = int(rng.uniform(0.006, 0.03) * SR)
        i = int(at * SR)
        burst = fft_filter(rng.standard_normal(n), lo=1800, hi=9000) * np.exp(-np.arange(n) / n * 4)
        out[i : i + n] += burst[: len(out) - i] * rng.uniform(0.3, 1)
    return out * 0.6


SFX = {
    "marker": sfx_marker,
    "click": sfx_click,
    "pop": sfx_pop,
    "whoosh": sfx_whoosh,
    "swipe": sfx_swipe,
    "impact": sfx_impact,
    "ding": sfx_ding,
    "coin": sfx_coin,
    "tick": sfx_tick,
    "thud": sfx_thud,
    "boing": sfx_boing,
    "success": sfx_success,
    "scratch": sfx_scratch,
    "crumple": sfx_crumple,
}


def write_mp3(name, sig, stereo_width=0.0):
    sig = np.asarray(sig, dtype=np.float64)
    peak = np.max(np.abs(sig)) + 1e-9
    if peak > 0.98:
        sig = sig / peak * 0.98
    if stereo_width:
        d = int(0.011 * SR)
        r = np.concatenate([np.zeros(d), sig[:-d]])
        st = np.stack([sig, sig * (1 - stereo_width) + r * stereo_width], axis=1)
    else:
        st = np.stack([sig, sig], axis=1)
    pcm = (st * 32767).astype(np.int16)
    with tempfile.NamedTemporaryFile(suffix=".raw", delete=False) as f:
        f.write(pcm.tobytes())
        raw = f.name
    out = os.path.join(OUT_DIR, name)
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "s16le", "-ar", str(SR), "-ac", "2", "-i", raw,
         "-codec:a", "libmp3lame", "-b:a", "192k", out],
        check=True,
    )
    os.unlink(raw)
    print("wrote", out)


if __name__ == "__main__":
    os.makedirs(OUT_DIR, exist_ok=True)
    write_mp3("music.mp3", build_music(), stereo_width=0.35)
    for name, fn in SFX.items():
        write_mp3(f"sfx-{name}.mp3", fn())
