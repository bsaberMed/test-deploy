import { Component, OnInit } from '@angular/core';
import { AddEditVoComponent } from './add-edit-vo/add-edit-vo.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';

import { User, Vo } from '@app/_models';
import { AccountService, VoService } from '@app/_services';
@Component({ templateUrl: 'home.component.html' })

export class HomeComponent implements OnInit {
    user: User;
    listVo: any;
    loadingDelete: boolean = false;

    constructor(private accountService: AccountService,
                private voService: VoService,
                private modalService: NgbModal) {
        this.user = this.accountService.userValue;
    }
    ngOnInit() {
        this.getList();
    }
    getList(){
        this.voService.get().pipe(first())
        .subscribe(data => this.listVo = data);
    }

    add(){
        const modalRef = this.modalService.open(AddEditVoComponent, { size: 'lg', backdrop: 'static' });
        modalRef.result.then((data) => {
            // on close
            this.listVo.push(data);
          }, (reason) => {
            // on dismiss
          });
    }

    editVo(element: Vo){
        const modalRef = this.modalService.open(AddEditVoComponent, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.vo = element; 
        modalRef.result.then((data) => {
            // on close
            var index = this.listVo.findIndex(item => item.id === data.id);
            this.listVo[index] = data;
          }, (reason) => {
            // on dismiss
          });
     }


    deleteVo(id: number){
        this.loadingDelete = true;
        this.voService.delete(id).subscribe(result => {
            var index = this.listVo.findIndex(item => item.id === id);
            this.listVo.splice(index, 1);
            this.loadingDelete = false;
        })
    }
}