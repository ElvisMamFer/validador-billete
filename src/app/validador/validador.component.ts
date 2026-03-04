import { Component, ElementRef, ViewChild } from '@angular/core';
import Tesseract from 'tesseract.js';

@Component({
  selector: 'app-validador',
  standalone: true,
  template: `
    <h2>Validador de Serie - Billete Bolivia</h2>

    <video #video width="300" autoplay></video>
    <br><br>
    <button (click)="iniciarCamara()">Iniciar Cámara</button>
    <button (click)="capturar()">Capturar</button>

    <br><br>
    <canvas #canvas width="300" height="200" style="display:none;"></canvas>

    <p><strong>Texto Detectado:</strong> {{ textoDetectado }}</p>
    <p><strong>Serie Detectada:</strong> {{ serieDetectada }}</p>
    <p><strong>Resultado:</strong> {{ resultado }}</p>
  `
})
export class ValidadorComponent {

  @ViewChild('video') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  textoDetectado = '';
  serieDetectada = '';
  resultado = '';

  // 🔢 Rango de ejemplo
  rangoInicio = 500000;
  rangoFin = 600000;

  async iniciarCamara() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    this.videoRef.nativeElement.srcObject = stream;
  }

  async capturar() {
    const video = this.videoRef.nativeElement;
    const canvas = this.canvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const imageData = canvas.toDataURL('image/png');

    const { data: { text } } = await Tesseract.recognize(imageData, 'eng');

    this.textoDetectado = text;

    // 🔍 Buscar patrón tipo: AB123456 o A123456
    const match = text.match(/[A-Z]{1,2}\d{6,8}/);

    if (match) {
      this.serieDetectada = match[0];

      const numeros = parseInt(this.serieDetectada.replace(/[A-Z]/g, ''));

      if (numeros >= this.rangoInicio && numeros <= this.rangoFin) {
        this.resultado = '✅ Serie dentro del rango';
      } else {
        this.resultado = '❌ Serie fuera del rango';
      }

    } else {
      this.resultado = 'No se detectó serie válida';
    }
  }
}