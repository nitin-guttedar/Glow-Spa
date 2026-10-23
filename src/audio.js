// Luxury Spa Ambient Sound Engine using Web Audio API
// Generates gentle water ripples, warm meditative drone, and periodic singing bowl chimes

class SpaSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.noiseNode = null;
    this.droneOscs = [];
    this.chimeInterval = null;
    this.analyser = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
  }

  // Create gentle water stream effect with filtered noise
  createWaterStream() {
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    // Pink noise generation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Dual resonant bandpass filters for bubbling water ripple feel
    const filter1 = this.ctx.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.setValueAtTime(450, this.ctx.currentTime);
    filter1.Q.setValueAtTime(2.5, this.ctx.currentTime);

    const filter2 = this.ctx.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.setValueAtTime(800, this.ctx.currentTime);

    // Subtle LFO modulation to simulate flowing water ripples
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.25, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(120, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter1.frequency);
    lfo.start();

    const waterGain = this.ctx.createGain();
    waterGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    noiseSource.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(waterGain);
    waterGain.connect(this.masterGain);

    noiseSource.start();
    this.noiseNode = noiseSource;
  }

  // Create warm, grounding ambient drone (F major 9 chord)
  createDrone() {
    // 174Hz (Solfeggio healing frequency), 261.6Hz (C4), 329.6Hz (E4), 392Hz (G4), 523.25Hz (C5)
    const freqs = [174.61, 261.63, 329.63, 392.00];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle detune for lush chorus feel
      osc.detune.setValueAtTime((Math.random() - 0.5) * 8, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.045 / (idx + 1), this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      this.droneOscs.push(osc);
    });
  }

  // Crystal singing bowl chime
  playChime() {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;
    
    // Fundamental + harmonics for singing bowl
    const baseFreq = 528; // Love / DNA repair Solfeggio frequency
    const harmonics = [1, 2.76, 5.4];

    harmonics.forEach((h, i) => {
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq * h, now);

      const gain = this.ctx.createGain();
      const peak = (0.04 / (i + 1));
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(peak, now + 0.15);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 6.0);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 6.5);
    });
  }

  start() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;

    this.createWaterStream();
    this.createDrone();

    // Fade master gain in
    this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.masterGain.gain.exponentialRampToValueAtTime(0.65, this.ctx.currentTime + 3.0);

    // Initial chime, then every 12 seconds
    setTimeout(() => this.playChime(), 1500);
    this.chimeInterval = setInterval(() => {
      this.playChime();
    }, 12000);
  }

  stop() {
    if (!this.ctx || !this.isPlaying) return;
    this.isPlaying = false;
    
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 1.2);
    }

    if (this.chimeInterval) {
      clearInterval(this.chimeInterval);
      this.chimeInterval = null;
    }

    setTimeout(() => {
      if (this.noiseNode) {
        try { this.noiseNode.stop(); } catch(e){}
        this.noiseNode = null;
      }
      this.droneOscs.forEach(osc => {
        try { osc.stop(); } catch(e){}
      });
      this.droneOscs = [];
    }, 1300);
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  getByteFrequencyData(array) {
    if (this.analyser && this.isPlaying) {
      this.analyser.getByteFrequencyData(array);
    } else {
      array.fill(0);
    }
  }
}

export const spaAudio = new SpaSoundscape();
