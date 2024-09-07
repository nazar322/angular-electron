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
    private electronService: ElectronService) { }

  ngOnInit(): void {
    console.log('HomeComponent INIT');
  }

  test(): void {
    this.electronService.ipcRenderer.invoke('get-media-info', {url: 'https://www.youtube.com/watch?v=8mM5Oks8yZc'})
      .then((result) => {
        console.log(result);
      });
  }

}
