import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Settings } from 'src/app/models/Settings';
import { HttpClientService } from 'src/app/services/http-client.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  form!: FormGroup;
  setting: Settings | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClientService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.settingsForm();
    this.getSettings();
  }

  getSettings() {
    this.http.get<Settings>('settings', (res) => {
      this.setting = res;
      this.form.patchValue({
        phone: res.phone,
        email: res.email,
        address: res.address,
      });
    });
  }

  settingsForm() {
    this.form = this.formBuilder.group({
      phone: ['', [Validators.required, Validators.maxLength(11)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  updateSettings() {
    this.confirmationService.confirm({
      message: 'Bu Ayarları Güncellemek İstediğinize Emin Misiniz?',
      header: 'Ayarları Güncelleme',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      acceptLabel: 'Evet',
      rejectLabel: 'Hayır',
      rejectButtonStyleClass: 'p-button-text p-button-text',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Güncellendi',
          detail: 'Ayarları Güncelleme İşlemi Başarılı',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'İptal Edildi',
          detail: 'Ayarları Güncelleme İşlemi İptal Edildi',
        });
      },
    });
  }

  get newPhone(): FormControl {
    return this.form.get('phone') as FormControl;
  }

  get newEmail(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get newAddress(): FormControl {
    return this.form.get('address') as FormControl;
  }
}
