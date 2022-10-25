import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HorarioService } from '../services/horario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


const GRAPH_ENDPOINT = 'https://graph.microsoft.com/v1.0/me';

type ProfileType = {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Component({
  selector: 'app-rhorario',
  templateUrl: './rhorario.component.html',
  styleUrls: ['./rhorario.component.css']
})
export class RhorarioComponent implements OnInit {
  profile!: ProfileType;
  createHorario:FormGroup; //variable para verificar formulario
  submited = false; // variable para enviar datos
  id: string | null | undefined;

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private _horarioService:HorarioService,
    private router: Router,
    private aRoute: ActivatedRoute,
    private toastr: ToastrService,
  ) {
    this.createHorario = this.fb.group({
      nombre: ['',Validators.required],
      Lunes: ['',Validators.required],
      ingresoL: ['',Validators.required],
      salidaL: ['',Validators.required],
      Martes: ['',Validators.required],
      ingresoM: ['',Validators.required],
      salidaM: ['',Validators.required],
      Miercoles: ['',Validators.required],
      ingresoMi: ['',Validators.required],
      salidaMi: ['',Validators.required],
      Jueves: ['',Validators.required],
      ingresoJ: ['',Validators.required],
      salidaJ: ['',Validators.required],
      Viernes: ['',Validators.required],
      ingresoV: ['',Validators.required],
      salidaV: ['',Validators.required],
      Sábado: ['',Validators.required],
      ingresoS: ['',Validators.required],
      salidaS: ['',Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id')
  }

  ngOnInit() {
    this.getProfile();
  }


  getProfile() {
    this.http.get(GRAPH_ENDPOINT)
      .subscribe(profile => {
        this.profile = profile;
      });
  }
  agregarHorario(){
    const horario: any ={ //se crea el item con los datos a enviar
      nombre: this.profile.givenName,
      Lunes:[
        this.createHorario.value.ingresoL,
        this.createHorario.value.salidaL,
      ],
      Martes:[
        this.createHorario.value.ingresoM,
        this.createHorario.value.salidaM,
      ],
      Miercoles:[
        this.createHorario.value.ingresoMi,
        this.createHorario.value.salidaMi,
      ],

      Jueves:[
        this.createHorario.value.ingresoJ,
        this.createHorario.value.salidaJ,
      ],
      Viernes:[
        this.createHorario.value.ingresoV,
        this.createHorario.value.salidaV,
      ],

      Sábado:[
        this.createHorario.value.ingresoS,
        this.createHorario.value.salidaS,
      ],

      fechaCreacion: new Date()
    }
    this._horarioService.agregarHorario(horario).then(()=>{ // se valida la creacion 
      this.toastr.success('Se a registrado con éxito','Horario Registrado',{
        positionClass: 'toast-bottom-right'
      })
      
      this.router.navigate(['/home']) // despues de agregar manda al listado general
    }).catch(error =>{
      console.log(error);
    })

  }

}
