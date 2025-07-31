import { Component, OnInit } from '@angular/core';
import { environment_demo } from '../../../../../../environments/environment.demo';

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = environment_demo.appVersion;
  appPreviewChangelogUrl: string = environment_demo.appPreviewChangelogUrl;

  constructor() {}

  ngOnInit(): void {}
}
