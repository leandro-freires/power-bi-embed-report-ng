import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import * as pbi from 'powerbi-client';
import { models } from 'powerbi-client';
import { Subscription, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

import AuthSettings from './config/auth-settings';
import { AuthService } from './service/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('reportContainer') reportContainer: ElementRef;

  authServiceSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.embedReport();
  }

  private embedReport(): void {
    this.authServiceSubscription = this.authService.accessToken.subscribe(
      (accessToken: string) => {
        let report: pbi.Embed;
        const embedUrl = AuthSettings.embeddedUrl;
        const reportId = AuthSettings.reportId;

        const settings: pbi.IEmbedSettings = {
          filterPaneEnabled: true,
          navContentPaneEnabled: true,
        };

        const config: pbi.IEmbedConfiguration = {
          type: 'report',
          embedUrl: embedUrl,
          id: reportId,
          accessToken,
          tokenType: models.TokenType.Aad,
          permissions: models.Permissions.All,
          viewMode: models.ViewMode.View,
          settings: settings
        };

        const reportContainer = this.reportContainer.nativeElement as HTMLElement;
        const powerBi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
        report = powerBi.embed(reportContainer, config);

        report.off('loaded');

        report.on('loaded', function() {
          console.log('Loaded');
        });
      },
      (error: HttpErrorResponse) => this.handleError(error)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<HttpErrorResponse> {
    console.log(error);
    return throwError(error);
  }

  ngOnDestroy(): void {
    this.authServiceSubscription.unsubscribe();
  }

}

