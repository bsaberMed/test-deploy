import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { Vo } from '@app/_models';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountService, AlertService, VoService } from '@app/_services';

@Component({
  templateUrl: './add-edit-vo.component.html',
  styleUrls: ['./add-edit-vo.component.css']
})
export class AddEditVoComponent implements OnInit{
  @Input() vo:Vo;
  form: FormGroup;
  submitted = false;
  loading = false;


  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private accountService: AccountService,
              private alertService: AlertService,
              private voService: VoService) {
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [this.vo != undefined ? this.vo.id : 0, Validators.required],
      erasmusCode: [this.vo != undefined ? this.vo.erasmusCode : '', Validators.required],
      appRefNumber: [this.vo != undefined ? this.vo.appRefNumber : '', Validators.required],
      Pic: [this.vo != undefined ? this.vo.Pic : '', Validators.required],
      organisationName: [this.vo != undefined ? this.vo.organisationName : '', Validators.required],
      businessName: [this.vo != undefined ? this.vo.businessName : '', Validators.required],
      website: [this.vo != undefined ? this.vo.website : '', Validators.required],
      adress: [this.vo != undefined ? this.vo.adress : '', Validators.required],
      postcode: [this.vo != undefined ? this.vo.postcode : '', Validators.required],
      city: [this.vo != undefined ? this.vo.city : '', Validators.required],
      country: [this.vo != undefined ? this.vo.country : '', Validators.required],
      echeValidFrom: [this.vo != undefined ? this.vo.echeValidFrom : '', Validators.required],
      echeValidUntil: [this.vo != undefined ? this.vo.echeValidUntil : '', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit(){
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    this.loading = true;

    this.voService.add(this.form.value)
            .pipe(first())
            .subscribe(
                data => {
                  this.loading = false;
                  if(data.id != undefined){
                    this.form.value.id = data.id;
                  }
                   this.activeModal.close(this.form.value);
                   this.loading = false;
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
