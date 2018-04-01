import { Component, OnInit } from '@angular/core';
import { Title } from "@angular/platform-browser";
import { HideFooterService } from "../../services/parent_comp_controls/hide-footer-service.service";
import { LogbookService } from "../../services/api-services/logbook.service";
import { LogEntry } from "../../services/api-services/logbook.service";

@Component({
  selector: 'app-logbook-form',
  templateUrl: './logbook-form.component.html',
  styleUrls: ['./logbook-form.component.css']
})
export class LogbookFormComponent implements OnInit {

  public picFirst: string;
  public picLast: string;
  public sicFirst: string;
  public sicLast: string;
  public dep: string;
  public dest: string;
  public ac: string;
  public night: number;
  public imc: number;
  public total: number;
  public takeoffs: number;
  public landings: number;

  constructor(private title: Title, private hideFooterService: HideFooterService,
              private logService:LogbookService) {
    this.title.setTitle('Logbook Form');
    this.hideFooterService.hide();
  }

  ngOnInit() {

  }
  buildJson(): JSON {
      let jsonEntry = `
          {
              picFirst: ${this.picFirst}, 
              picLast: ${this.picLast},
              sicFirst: ${this.sicFirst},
              sicLast: ${this.sicLast},
              acAbrev: ${this.ac},
              isJet: "false",
              noEngines: "1",
              dep: ${this.dep},
              dest: ${this.dest},
              imc: ${this.imc},
              to: ${this.takeoffs},
              lands: ${this.landings},
              total: ${this.total},
              night: ${this.night}
          }`
          return JSON.parse(jsonEntry);
    }



  submit() {
    this.logService.postLogs(this.buildJson());
  }
}
