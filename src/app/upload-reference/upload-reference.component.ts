import { Component } from '@angular/core';
import { Vo } from '@app/_models';
import { AlertService, VoService } from '@app/_services';
import { first } from 'rxjs/operators';

import * as XLSX from 'xlsx';


@Component({
  selector: 'app-upload-reference',
  templateUrl: './upload-reference.component.html',
  styleUrls: ['./upload-reference.component.css']
})
export class UploadReferenceComponent {
  data: any;
  listVo: Vo[];
  submitted = false;
  loading = false;

  constructor(private voService: VoService,
              private alertService: AlertService,){

  }
  readFile(event){
    let file = event.target.files[0];
    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, {type: 'binary', cellDates: true});
      var sheetNames = workBook.SheetNames;
      this.data = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      this.listVo = this.data.map( (el, k) =>
        (
           {
            id: 0,
            erasmusCode: el[" Erasmus Code"],
            appRefNumber: el["Application Reference Number"],
            Pic:  el["PIC"].toString(),
            organisationName: el["Organisation name"],
            businessName: el["Business Name"],
            website: el["Website"],
            adress: el["Adress"],
            postcode: el["Postcode"].toString(),
            city: el["City"],
            country: el["Country"],
            echeValidFrom: el["ECHE valid from"],
            echeValidUntil: el["ECHE valid until"],
          }
        ))
      }
  }

  validate(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    this.loading = true;

    this.voService.addList(this.listVo).subscribe(
        result => {
          this.loading = false;
        }
      )
    }
}
