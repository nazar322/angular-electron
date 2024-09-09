import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electronyzer';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router,
    private electronService: ElectronService) { 
      electronService.ipcRenderer.once('get-media-info-response', this.onMediaInfoReceived);
    }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  test(): void {
    this.electronService.ipcRenderer.send('get-media-info', {url: 'https://www.youtube.com/watch?v=8mM5Oks8yZc'});
  }

  private onMediaInfoReceived(event: Electron.IpcRendererEvent, args: string): void {
    var info = JSON.parse(args);
    console.log(info);
  }
}
