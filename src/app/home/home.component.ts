import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ElectronService } from 'ngx-electronyzer';
import { IpcRenderer } from 'electron';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  url:  string = '';
  info: string = '';

  constructor(private router: Router,
    private ngZone: NgZone,
    private electronService: ElectronService) { 
      electronService.ipcRenderer.once('get-media-info-response', (event, args) => {
        this.ngZone.run(() => {
          this.onMediaInfoReceived(args);
        });
      });
    }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  test(): void {
    this.electronService.ipcRenderer.send('get-media-info', {url: this.url});
  }

  private onMediaInfoReceived(info: string): void {
    const json = JSON.parse(info);
    console.log(json);
    this.info = info;
  }
}
