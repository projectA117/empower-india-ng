import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  FormControl,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Product } from '@domain/product';
import { ProductService } from '@service/productservice';
import { ImportsModule } from '../imports';
import { CommonService } from '../../service/common.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  standalone: true,
  imports: [ImportsModule, FormsModule, DropdownModule, ReactiveFormsModule],
  providers: [
    MessageService,
    ConfirmationService,
    ProductService,
    CommonService,
  ],
  styleUrl: './projects.component.scss',
  styles: [
    `
      :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
      }
    `,
  ],
})
export class ProjectsComponent implements OnInit {
  productDialog: boolean = false;

  products!: Product[];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  selectedDistrict: any = {};
  selectMandals: any = {};
  selectVilage: any = {};
  DistrictDetails: any = [];
  MandalsDetails: any = [
    {
      DistrictName: 'ALLURI SITARAMARAJU',
      DistrictCode: '745',
      Get_mandals: [
        {
          Mandal_Code: '4887',
          MandalName: 'Addateegala (అడ్డతీగల)',
        },
        {
          Mandal_Code: '4845',
          MandalName: 'Ananthagiri (అనంతగిరి)',
        },
        {
          Mandal_Code: '4844',
          MandalName: 'Araku Valley (అరుకువేలీ)',
        },
        {
          Mandal_Code: '4849',
          MandalName: 'Chintapalle (చింతపల్లి)',
        },
        {
          Mandal_Code: '4732',
          MandalName: 'Chintur (చింతూరు)',
        },
        {
          Mandal_Code: '4885',
          MandalName: 'Devipatnam (దేవీపట్నం)',
        },
        {
          Mandal_Code: '4843',
          MandalName: 'Dumbriguda (డుంబ్రిగుడ)',
        },
        {
          Mandal_Code: '4848',
          MandalName: 'Gangaraju Madugula (జి.మాడుగుల)',
        },
        {
          Mandal_Code: '4894',
          MandalName: 'Gangavaram (గంగవరం)',
        },
        {
          Mandal_Code: '4850',
          MandalName: 'Gudem Kothaveedhi (జి.కె.వీది)',
        },
        {
          Mandal_Code: '4846',
          MandalName: 'Hukumpeta (హుక్కుంపేట)',
        },
        {
          Mandal_Code: '4851',
          MandalName: 'Koyyuru ( కొయ్యూరు)',
        },
        {
          Mandal_Code: '4731',
          MandalName: 'Kunavaram (కూనవరం)',
        },
        {
          Mandal_Code: '4884',
          MandalName: 'Maredumilli (మారేడుమిల్లి)',
        },
        {
          Mandal_Code: '4841',
          MandalName: 'Munchingput (ముంచంగిపుట్టు)',
        },
        {
          Mandal_Code: '6063',
          MandalName: 'Nellipaka (నెల్లిపాక)',
        },
        {
          Mandal_Code: '4847',
          MandalName: 'Paderu (పాడేరు)',
        },
        {
          Mandal_Code: '4842',
          MandalName: 'Pedabayalu (పెదబయలు)',
        },
        {
          Mandal_Code: '4888',
          MandalName: 'Rajavommangi (రాజఒమ్మంగి)',
        },
        {
          Mandal_Code: '4895',
          MandalName: 'Rampachodavaram (రంపచోడవరం)',
        },
        {
          Mandal_Code: '4733',
          MandalName: 'Vararamachandrapuram (వి ఆర్ పురం)',
        },
        {
          Mandal_Code: '4886',
          MandalName: 'Y Ramavaram (వై. రామవరం)',
        },
      ],
    },
    {
      DistrictName: 'ANAKAPALLI',
      DistrictCode: '744',
      Get_mandals: [
        {
          Mandal_Code: '4871',
          MandalName: 'Anakapalli (అనకాపల్లి)',
        },
        {
          Mandal_Code: '4878',
          MandalName: 'Atchutapuram (అచ్యుతాపురం)',
        },
        {
          Mandal_Code: '4873',
          MandalName: 'Butchayyapeta (బుచ్చయ్యపేట)',
        },
        {
          Mandal_Code: '4858',
          MandalName: 'Cheedikada (చీడికాడ)',
        },
        {
          Mandal_Code: '4872',
          MandalName: 'Chodavaram (చోడవరం)',
        },
        {
          Mandal_Code: '4859',
          MandalName: 'Devarapalle (దేవరాపల్లి)',
        },
        {
          Mandal_Code: '4853',
          MandalName: 'Golugonda (గోలుగోండ)',
        },
        {
          Mandal_Code: '4860',
          MandalName: 'K Kotapadu (కె.కోటపాడు)',
        },
        {
          Mandal_Code: '4876',
          MandalName: 'Kasimkota (కశింకోట)',
        },
        {
          Mandal_Code: '4874',
          MandalName: 'Kotauratla (కోటవురట్ల)',
        },
        {
          Mandal_Code: '4857',
          MandalName: 'Madugula (మాడుగుల)',
        },
        {
          Mandal_Code: '4875',
          MandalName: 'Makavarapalem (మాకవరపాలెం)',
        },
        {
          Mandal_Code: '4877',
          MandalName: 'Munagapaka (మునగపాక)',
        },
        {
          Mandal_Code: '4880',
          MandalName: 'Nakkapalli (నక్కపల్లి)',
        },
        {
          Mandal_Code: '4854',
          MandalName: 'Narsipatnam (నర్సిపట్నం)',
        },
        {
          Mandal_Code: '4852',
          MandalName: 'Nathavaram (నాతవరం)',
        },
        {
          Mandal_Code: '4870',
          MandalName: 'Paravada (పరవాడ)',
        },
        {
          Mandal_Code: '4881',
          MandalName: 'Payakaraopeta (పాయకరావుపేట)',
        },
        {
          Mandal_Code: '4883',
          MandalName: 'Rambilli (రాంబిల్లి)',
        },
        {
          Mandal_Code: '4856',
          MandalName: 'Ravikamatham (రావికమతం)',
        },
        {
          Mandal_Code: '4855',
          MandalName: 'Rolugunta (రోలుగుంట)',
        },
        {
          Mandal_Code: '4882',
          MandalName: 'S Rayavaram (యస్.రాయవరం)',
        },
        {
          Mandal_Code: '4861',
          MandalName: 'Sabbavaram (సబ్బవరం)',
        },
        {
          Mandal_Code: '4879',
          MandalName: 'Yelamanchili (యలమంచిలి)',
        },
      ],
    },
    {
      DistrictName: 'ANNAMAYYA',
      DistrictCode: '753',
      Get_mandals: [
        {
          Mandal_Code: '5391',
          MandalName: 'B Kothakota (బి.కొత్తకోట)',
        },
        {
          Mandal_Code: '5236',
          MandalName: 'Chinnamandem (చిన్నమండ్యము)',
        },
        {
          Mandal_Code: '5245',
          MandalName: 'Chitvel (చిట్వేల్)',
        },
        {
          Mandal_Code: '5235',
          MandalName: 'Galiveedu (గాలివీడు)',
        },
        {
          Mandal_Code: '5370',
          MandalName: 'Gurramkonda (గుర్రంకొండ)',
        },
        {
          Mandal_Code: '5371',
          MandalName: 'Kalakada (కలకడ)',
        },
        {
          Mandal_Code: '5387',
          MandalName: 'Kalikiri (కలికిరి)',
        },
        {
          Mandal_Code: '5372',
          MandalName: 'Kambhamvaripalle (కె.వి.పల్లి)',
        },
        {
          Mandal_Code: '5249',
          MandalName: 'Kodur (కోడూరు)',
        },
        {
          Mandal_Code: '5389',
          MandalName: 'Kurabalakota (కురబలకోట)',
        },
        {
          Mandal_Code: '5240',
          MandalName: 'Lakkireddipalle (లక్కిరెడ్డిపల్లె)',
        },
        {
          Mandal_Code: '5392',
          MandalName: 'Madanapalle (మదనపల్లి)',
        },
        {
          Mandal_Code: '5367',
          MandalName: 'Mulakalacheruvu (ములకలచెరువు)',
        },
        {
          Mandal_Code: '5243',
          MandalName: 'Nandalur (నందలూరు)',
        },
        {
          Mandal_Code: '5393',
          MandalName: 'Nimmanapalle (నిమ్మనపల్లి)',
        },
        {
          Mandal_Code: '5248',
          MandalName: 'Obulavaripalle (ఓబులవారిపల్లి)',
        },
        {
          Mandal_Code: '5369',
          MandalName: 'Peddamandyam (పెద్దమండ్యం)',
        },
        {
          Mandal_Code: '5390',
          MandalName: 'Peddathippasamudram (పెద్దతిప్పసముద్రం)',
        },
        {
          Mandal_Code: '5244',
          MandalName: 'Penagaluru (పెనగలూరు)',
        },
        {
          Mandal_Code: '5386',
          MandalName: 'Pileru (పీలేరు)',
        },
        {
          Mandal_Code: '5247',
          MandalName: 'Pullampeta (పుల్లం పేట)',
        },
        {
          Mandal_Code: '5246',
          MandalName: 'Rajampet (రాజంపేట)',
        },
        {
          Mandal_Code: '5241',
          MandalName: 'Ramapuram (రామాపురం)',
        },
        {
          Mandal_Code: '5414',
          MandalName: 'Ramasamudram (రామసముద్రం)',
        },
        {
          Mandal_Code: '5239',
          MandalName: 'Rayachoti (రాయచోటి)',
        },
        {
          Mandal_Code: '5237',
          MandalName: 'Sambepalle (సంబే పల్లె)',
        },
        {
          Mandal_Code: '5238',
          MandalName: 'T Sundupalle (టి.సుండుపల్లె)',
        },
        {
          Mandal_Code: '5368',
          MandalName: 'THAMBALLAPALLI (తంబళ్ళపల్లి)',
        },
        {
          Mandal_Code: '5388',
          MandalName: 'Valmikipuram (వాల్మీకిపురం)',
        },
        {
          Mandal_Code: '5242',
          MandalName: 'Veeraballe (వీరబల్లి)',
        },
      ],
    },
    {
      DistrictName: 'BAPATLA',
      DistrictCode: '750',
      Get_mandals: [
        {
          Mandal_Code: '5330',
          MandalName: 'Anantapur (అనంతపురం)',
        },
        {
          Mandal_Code: '5322',
          MandalName: 'Atmakur (ఆత్మకూరు)',
        },
        {
          Mandal_Code: '5318',
          MandalName: 'Beluguppa (బెళుగుప్ప)',
        },
        {
          Mandal_Code: '5307',
          MandalName: 'Bommanahal (బొమ్మనహళ్)',
        },
        {
          Mandal_Code: '5320',
          MandalName: 'Brahmasamudram (బ్రహ్మసముద్రం)',
        },
        {
          Mandal_Code: '5329',
          MandalName: 'Bukkarayasamudram (బుక్కరాయసముద్రం)',
        },
        {
          Mandal_Code: '5304',
          MandalName: 'D.Hirchal (దండినహిరెహల్)',
        },
        {
          Mandal_Code: '5324',
          MandalName: 'Garladinne (గార్లదిన్నె)',
        },
        {
          Mandal_Code: '5310',
          MandalName: 'Gooty (గుత్తి)',
        },
        {
          Mandal_Code: '5319',
          MandalName: 'Gummagatta (గుమ్మగట్ట)',
        },
        {
          Mandal_Code: '5309',
          MandalName: 'Guntakal (గుంతకల్)',
        },
        {
          Mandal_Code: '5321',
          MandalName: 'Kalyandurg (కళ్యాణదుర్గం)',
        },
        {
          Mandal_Code: '5334',
          MandalName: 'Kambadur (కంబదూరు)',
        },
        {
          Mandal_Code: '5306',
          MandalName: 'Kanekal (కనెకల్)',
        },
        {
          Mandal_Code: '5323',
          MandalName: 'Kudair (కూడేరు)',
        },
        {
          Mandal_Code: '5333',
          MandalName: 'Kundurpi (కుందుర్పి)',
        },
        {
          Mandal_Code: '5328',
          MandalName: 'Narpala (నార్పల)',
        },
        {
          Mandal_Code: '5315',
          MandalName: 'Pamidi (పామిడి)',
        },
        {
          Mandal_Code: '5314',
          MandalName: 'Peddapappur (పెద్దపప్పూరు)',
        },
        {
          Mandal_Code: '5311',
          MandalName: 'Peddavadugur (పెద్దవడగూరు)',
        },
        {
          Mandal_Code: '5326',
          MandalName: 'Putlur (పుట్లూరు)',
        },
        {
          Mandal_Code: '5331',
          MandalName: 'Raptadu (రాప్తాడు)',
        },
        {
          Mandal_Code: '5305',
          MandalName: 'Rayadurg (రాయదుర్గం)',
        },
        {
          Mandal_Code: '5332',
          MandalName: 'Settur (శెట్టూరు)',
        },
        {
          Mandal_Code: '5325',
          MandalName: 'Singanamala (శింగనమల)',
        },
        {
          Mandal_Code: '5313',
          MandalName: 'Tadipatri (తాడిపత్రి)',
        },
        {
          Mandal_Code: '5317',
          MandalName: 'Uravakonda (ఉరవకొండ)',
        },
        {
          Mandal_Code: '5316',
          MandalName: 'Vajrakarur (వజ్రకరూర్)',
        },
        {
          Mandal_Code: '5308',
          MandalName: 'Vidapanakal (విడపనకల్)',
        },
        {
          Mandal_Code: '5312',
          MandalName: 'Yadiki (యాడికి)',
        },
        {
          Mandal_Code: '5327',
          MandalName: 'Yellanur (యల్లనూరు)',
        },
      ],
    },
    {
      DistrictName: 'CHITTOOR',
      DistrictCode: '503',
      Get_mandals: [
        {
          Mandal_Code: '5423',
          MandalName: 'BAIREDDIPALLE (బైరెడ్డిపల్లి)',
        },
        {
          Mandal_Code: '5429',
          MandalName: 'Bangarupalem (బంగారుపాలెం)',
        },
        {
          Mandal_Code: '5421',
          MandalName: 'Chittoor (చిత్తూరు)',
        },
        {
          Mandal_Code: '5413',
          MandalName: 'Chowdepalle (చౌడేపల్లి)',
        },
        {
          Mandal_Code: '5420',
          MandalName: 'Gangadhara Nellore (గంగాధరనెల్లూరు)',
        },
        {
          Mandal_Code: '5417',
          MandalName: 'Gangavaram (గంగవరం)',
        },
        {
          Mandal_Code: '5426',
          MandalName: 'Gudi Palle (గుడిపల్లె)',
        },
        {
          Mandal_Code: '5431',
          MandalName: 'Gudipala (గుడిపాల)',
        },
        {
          Mandal_Code: '5411',
          MandalName: 'Irala (ఐరాల)',
        },
        {
          Mandal_Code: '5408',
          MandalName: 'Karvetinagar (కార్వేటినగరం)',
        },
        {
          Mandal_Code: '5427',
          MandalName: 'Kuppam (కుప్పం)',
        },
        {
          Mandal_Code: '5428',
          MandalName: 'Kuppam (కుప్పం)',
        },
        {
          Mandal_Code: '5406',
          MandalName: 'Nagari (నగరి)',
        },
        {
          Mandal_Code: '5404',
          MandalName: 'Nindra (నిండ్ర)',
        },
        {
          Mandal_Code: '5422',
          MandalName: 'Palamaner (పలమనేరు)',
        },
        {
          Mandal_Code: '5432',
          MandalName: 'Palasamudram (పాలసముద్రం)',
        },
        {
          Mandal_Code: '5416',
          MandalName: 'Pedda Panjani (పెద్దపంజాణి)',
        },
        {
          Mandal_Code: '5409',
          MandalName: 'Penumuru (పెనుమూరు)',
        },
        {
          Mandal_Code: '5395',
          MandalName: 'Pulicherla (పులిచెర్ల)',
        },
        {
          Mandal_Code: '5415',
          MandalName: 'Punganur (పుంగనూరు)',
        },
        {
          Mandal_Code: '5410',
          MandalName: 'Puthalapattu (పూతలపట్టు)',
        },
        {
          Mandal_Code: '5428',
          MandalName: 'Rama Kuppam (రామకుప్పం)',
        },
        {
          Mandal_Code: '5373',
          MandalName: 'Rompicherla (రొంపిచెర్ల)',
        },
        {
          Mandal_Code: '5425',
          MandalName: 'Santhi Puram (శాంతిపురం)',
        },
        {
          Mandal_Code: '5394',
          MandalName: 'Sodam (సదుం)',
        },
        {
          Mandal_Code: '5412',
          MandalName: 'Somala (సోమల)',
        },
        {
          Mandal_Code: '5419',
          MandalName: 'Srirangarajapuram (ఎస్.ఆర్.పురం)',
        },
        {
          Mandal_Code: '5418',
          MandalName: 'Thavanampalle (తవణంపల్లి)',
        },
        {
          Mandal_Code: '5397',
          MandalName: 'Veduru Kuppam (వెదురుకుప్పం)',
        },
        {
          Mandal_Code: '5424',
          MandalName: 'Venkatagiri Kota (వి.కోట)',
        },
        {
          Mandal_Code: '5405',
          MandalName: 'Vijaya Puram (విజయపురం)',
        },
        {
          Mandal_Code: '5430',
          MandalName: 'Yadamari (యాదమరి)',
        },
      ],
    },
    {
      DistrictName: 'EAST GODAVARI',
      DistrictCode: '505',
      Get_mandals: [
        {
          Mandal_Code: '4887',
          MandalName: 'Addateegala (అడ్డతీగల)',
        },
        {
          Mandal_Code: '4917',
          MandalName: 'Anaparthy (అనపర్తి)',
        },
        {
          Mandal_Code: '4916',
          MandalName: 'Biccavolu (బిక్కవోలు)',
        },
        {
          Mandal_Code: '4959',
          MandalName: 'Chagallu (చాగల్లు)',
        },
        {
          Mandal_Code: '4732',
          MandalName: 'Chintur (చింతూరు)',
        },
        {
          Mandal_Code: '4957',
          MandalName: 'Devarapalle (దేవరపల్లి)',
        },
        {
          Mandal_Code: '4885',
          MandalName: 'Devipatnam (దేవీపట్నం)',
        },
        {
          Mandal_Code: '4894',
          MandalName: 'Gangavaram (గంగవరం)',
        },
        {
          Mandal_Code: '4897',
          MandalName: 'Gokavaram (గోకవరం)',
        },
        {
          Mandal_Code: '4951',
          MandalName: 'Gopalapuram (గోపాలపురం)',
        },
        {
          Mandal_Code: '4918',
          MandalName: 'Kadiam (కడియం)',
        },
        {
          Mandal_Code: '4905',
          MandalName: 'Korukonda (కోరుకొండ)',
        },
        {
          Mandal_Code: '4958',
          MandalName: 'Kovvur (కోవ్వూరు)',
        },
        {
          Mandal_Code: '4731',
          MandalName: 'Kunavaram (కూనవరం)',
        },
        {
          Mandal_Code: '4884',
          MandalName: 'Maredumilli (మారేడుమిల్లి)',
        },
        {
          Mandal_Code: '4956',
          MandalName: 'Nallajerla (నల్లజర్ల)',
        },
        {
          Mandal_Code: '6063',
          MandalName: 'Nellipaka (నెల్లిపాక)',
        },
        {
          Mandal_Code: '4960',
          MandalName: 'Nidadavole (నిడదవోలు)',
        },
        {
          Mandal_Code: '4971',
          MandalName: 'Peravali (పెరవలి)',
        },
        {
          Mandal_Code: '4907',
          MandalName: 'Rajahmundry Rural (రాజమండ్రి రూరల్)',
        },
        {
          Mandal_Code: '4906',
          MandalName: 'Rajahmundry Urban (రాజమండ్రి అర్బన్)',
        },
        {
          Mandal_Code: '4908',
          MandalName: 'Rajanagaram (రాజానగరం)',
        },
        {
          Mandal_Code: '4888',
          MandalName: 'Rajavommangi (రాజఒమ్మంగి)',
        },
        {
          Mandal_Code: '4895',
          MandalName: 'Rampachodavaram (రంపచోడవరం)',
        },
        {
          Mandal_Code: '4909',
          MandalName: 'Rangampeta (రంగంపేట)',
        },
        {
          Mandal_Code: '4896',
          MandalName: 'Seethanagaram (సీతానగరం)',
        },
        {
          Mandal_Code: '4950',
          MandalName: 'Thallapudi (తాళ్లపూడి)',
        },
        {
          Mandal_Code: '4970',
          MandalName: 'Undrajavaram (ఉండ్రాజవరం)',
        },
        {
          Mandal_Code: '4733',
          MandalName: 'Vararamachandrapuram (వి ఆర్ పురం)',
        },
        {
          Mandal_Code: '4886',
          MandalName: 'Y Ramavaram (వై. రామవరం)',
        },
      ],
    },
    {
      DistrictName: 'ELURU',
      DistrictCode: '748',
      Get_mandals: [
        {
          Mandal_Code: '5005',
          MandalName: 'Agiripalle (అగిరిపల్లి)',
        },
        {
          Mandal_Code: '4963',
          MandalName: 'Bhimadole (భీమడోలు)',
        },
        {
          Mandal_Code: '4948',
          MandalName: 'Buttayagudem (బుట్టాయిగూడెం)',
        },
        {
          Mandal_Code: '5001',
          MandalName: 'Chatrai (చాట్రాయ్)',
        },
        {
          Mandal_Code: '4944',
          MandalName: 'Chintalapudi (చింతలపూడి)',
        },
        {
          Mandal_Code: '4967',
          MandalName: 'Denduluru (దెందులూరు)',
        },
        {
          Mandal_Code: '4955',
          MandalName: 'Dwaraka Tirumala (ద్వారకా తిరుమల)',
        },
        {
          Mandal_Code: '4966',
          MandalName: 'Eluru (ఏలూరు)',
        },
        {
          Mandal_Code: '4974',
          MandalName: 'Ganapavaram (గణపవరం)',
        },
        {
          Mandal_Code: '4953',
          MandalName: 'Jangareddigudem (జంగారెడ్డిగూడెం)',
        },
        {
          Mandal_Code: '4947',
          MandalName: 'Jeelugumilli (జీలుగుమిల్లి)',
        },
        {
          Mandal_Code: '5016',
          MandalName: 'Kaikalur (కైకలూరు)',
        },
        {
          Mandal_Code: '5017',
          MandalName: 'Kalidindi (కలిదిండి)',
        },
        {
          Mandal_Code: '4954',
          MandalName: 'Kamavarapukota (కామవరపుకోట)',
        },
        {
          Mandal_Code: '4952',
          MandalName: 'Koyyalagudem (కౌయ్యలగూడెం)',
        },
        {
          Mandal_Code: '4735',
          MandalName: 'Kukunoor (కుకునూరు)',
        },
        {
          Mandal_Code: '4945',
          MandalName: 'Lingapalem (లింగపాలెం)',
        },
        {
          Mandal_Code: '5015',
          MandalName: 'Mandavalli (మండవల్లి)',
        },
        {
          Mandal_Code: '5020',
          MandalName: 'Mudinepalli (ముదినేపల్లి)',
        },
        {
          Mandal_Code: '5002',
          MandalName: 'Musunuru (ముసునూరు)',
        },
        {
          Mandal_Code: '4968',
          MandalName: 'Nidamarru (నిడమర్రు)',
        },
        {
          Mandal_Code: '5003',
          MandalName: 'Nuzvid (నూజివీడు)',
        },
        {
          Mandal_Code: '4965',
          MandalName: 'Pedapadu (పెదపాడు)',
        },
        {
          Mandal_Code: '4966',
          MandalName: 'Pedapadu (పెదపాడు)',
        },
        {
          Mandal_Code: '4964',
          MandalName: 'Pedavegi (పెదవేగి)',
        },
        {
          Mandal_Code: '4949',
          MandalName: 'Polavaram (పోలవరం)',
        },
        {
          Mandal_Code: '4946',
          MandalName: 'T Narasapuram (టి.నరసాపురం)',
        },
        {
          Mandal_Code: '4962',
          MandalName: 'Unguturu (ఉంగుటూరు)',
        },
        {
          Mandal_Code: '4734',
          MandalName: 'Velairpad (వేలేరుపాడు)',
        },
      ],
    },
    {
      DistrictName: 'GUNTUR',
      DistrictCode: '506',
      Get_mandals: [
        {
          Mandal_Code: '5079',
          MandalName: 'Chebrole (చేబ్రోలు)',
        },
        {
          Mandal_Code: '5076',
          MandalName: 'Duggirala (దుగ్గిరాల)',
        },
        {
          Mandal_Code: '5074',
          MandalName: 'Guntur (గుంటూరు)',
        },
        {
          Mandal_Code: '5083',
          MandalName: 'Kakumanu (కాకుమాను)',
        },
        {
          Mandal_Code: '5077',
          MandalName: 'Kollipara (కొల్లిపర)',
        },
        {
          Mandal_Code: '5055',
          MandalName: 'Mangalagiri (మంగళగిరి)',
        },
        {
          Mandal_Code: '5073',
          MandalName: 'Medikonduru (మేడికొండూరు)',
        },
        {
          Mandal_Code: '5075',
          MandalName: 'Pedakakani (పెదకాకాని)',
        },
        {
          Mandal_Code: '5082',
          MandalName: 'Pedanandipadu (పెదనందిపాడు)',
        },
        {
          Mandal_Code: '5072',
          MandalName: 'Phirangipuram (ఫిరంగిపురం)',
        },
        {
          Mandal_Code: '5084',
          MandalName: 'Ponnur (పొన్నూరు)',
        },
        {
          Mandal_Code: '5081',
          MandalName: 'Prathipadu (ప్రత్తిపాడు)',
        },
        {
          Mandal_Code: '5054',
          MandalName: 'Tadepalli (తాడేపల్లి)',
        },
        {
          Mandal_Code: '5056',
          MandalName: 'Tadikonda (తాడికొండ)',
        },
        {
          Mandal_Code: '5078',
          MandalName: 'Tenali (తెనాలి)',
        },
        {
          Mandal_Code: '5053',
          MandalName: 'Thullur (తుళ్ళూరు)',
        },
        {
          Mandal_Code: '5080',
          MandalName: 'Vatticherukuru (వట్టిచెరుకూరు)',
        },
      ],
    },
    {
      DistrictName: 'KAKINADA',
      DistrictCode: '746',
      Get_mandals: [
        {
          Mandal_Code: '4904',
          MandalName: 'Gandepalle (గండేపల్లి)',
        },
        {
          Mandal_Code: '4902',
          MandalName: 'Gollaprolu (గోల్లప్రోలు)',
        },
        {
          Mandal_Code: '4898',
          MandalName: 'Jaggampeta (జగ్గంపేట)',
        },
        {
          Mandal_Code: '4923',
          MandalName: 'Kajuluru (కాజులూరు)',
        },
        {
          Mandal_Code: '4914',
          MandalName: 'Kakinada ( Urban ) (కాకినాడ(అర్బన్్))',
        },
        {
          Mandal_Code: '4913',
          MandalName: 'Kakinada (Rural) (కాకినాడరూరల్)',
        },
        {
          Mandal_Code: '4922',
          MandalName: 'Karapa (కరప)',
        },
        {
          Mandal_Code: '4899',
          MandalName: 'Kirlampudi (కిర్లంపూడి(v))',
        },
        {
          Mandal_Code: '4889',
          MandalName: 'Kotananduru (కోటనందూరు)',
        },
        {
          Mandal_Code: '4912',
          MandalName: 'Kothapalli (కొత్తపల్లి)',
        },
        {
          Mandal_Code: '4915',
          MandalName: 'Pedapudi (పెదపూడి)',
        },
        {
          Mandal_Code: '4903',
          MandalName: 'Peddapuram (పెద్దాపురం)',
        },
        {
          Mandal_Code: '4911',
          MandalName: 'Pithapuram (పిఠాపురం)',
        },
        {
          Mandal_Code: '4911',
          MandalName: 'Pithapuram\t (పిఠాపురం)',
        },
        {
          Mandal_Code: '4900',
          MandalName: 'Prathipadu (ప్రత్తిపాడు)',
        },
        {
          Mandal_Code: '4891',
          MandalName: 'Rowthulapudi (రౌతులపూడి)',
        },
        {
          Mandal_Code: '4910',
          MandalName: 'Samalkota (సామర్లకోట)',
        },
        {
          Mandal_Code: '4892',
          MandalName: 'Sankhavaram (శంఖవరం)',
        },
        {
          Mandal_Code: '4930',
          MandalName: 'Thallarevu (తాళ్లరేవు)',
        },
        {
          Mandal_Code: '4901',
          MandalName: 'Thondangi (తోండంగి)',
        },
        {
          Mandal_Code: '4890',
          MandalName: 'Tuni (తుని)',
        },
        {
          Mandal_Code: '4912',
          MandalName: 'U.Kothapalli (యు.కొత్తపల్లి)',
        },
        {
          Mandal_Code: '4893',
          MandalName: 'Yeleswaram (ఏలేశ్వరం)',
        },
      ],
    },
    {
      DistrictName: 'KONASEEMA',
      DistrictCode: '747',
      Get_mandals: [
        {
          Mandal_Code: '4933',
          MandalName: 'Ainavilli (అయినవిల్లి)',
        },
        {
          Mandal_Code: '4925',
          MandalName: 'Alamuru (ఆలమూరు)',
        },
        {
          Mandal_Code: '4940',
          MandalName: 'Allavaram (అల్లవరం)',
        },
        {
          Mandal_Code: '4941',
          MandalName: 'Amalapuram (అమలాపురం)',
        },
        {
          Mandal_Code: '4935',
          MandalName: 'Ambajipeta (అంబాజీపేట)',
        },
        {
          Mandal_Code: '4919',
          MandalName: 'Atreyapuram (ఆత్రేయపురం)',
        },
        {
          Mandal_Code: '4931',
          MandalName: 'I Polavaram (ఐ.పోలవరం)',
        },
        {
          Mandal_Code: '4929',
          MandalName: 'K Gangavaram (కే గన్నవరం )',
        },
        {
          Mandal_Code: '4928',
          MandalName: 'Kapileswarapuram (కపిలేశ్వరపురం)',
        },
        {
          Mandal_Code: '4943',
          MandalName: 'Katrenikona (కాట్రేనికోన)',
        },
        {
          Mandal_Code: '4927',
          MandalName: 'Kothapeta ( కొత్తపేట)',
        },
        {
          Mandal_Code: '4938',
          MandalName: 'Malikipuram (మలికిపురం)',
        },
        {
          Mandal_Code: '4936',
          MandalName: 'Mamidikuduru (మామిడికుదురు)',
        },
        {
          Mandal_Code: '4920',
          MandalName: 'Mandapeta (మండపేట)',
        },
        {
          Mandal_Code: '4932',
          MandalName: 'Mummidivaram (ముమ్మిడివరం)',
        },
        {
          Mandal_Code: '4934',
          MandalName: 'P Gannavaram (పి.గన్నవరం)',
        },
        {
          Mandal_Code: '4924',
          MandalName: 'Ramachandrapuram (రామచంద్రపురం)',
        },
        {
          Mandal_Code: '4926',
          MandalName: 'Ravulapalem (రావులపాలెం)',
        },
        {
          Mandal_Code: '4921',
          MandalName: 'Rayavaram (రాయవరం)',
        },
        {
          Mandal_Code: '4937',
          MandalName: 'Razole (రాజోలు)',
        },
        {
          Mandal_Code: '4939',
          MandalName: 'Sakhinetipalle (సఖినేటిపల్లి)',
        },
        {
          Mandal_Code: '4942',
          MandalName: 'Uppalaguptam (ఉప్పలగుప్తం)',
        },
      ],
    },
    {
      DistrictName: 'KRISHNA',
      DistrictCode: '510',
      Get_mandals: [
        {
          Mandal_Code: '5037',
          MandalName: 'Avanigadda (అవనిగడ్డ)',
        },
        {
          Mandal_Code: '5019',
          MandalName: 'Bantumilli (బంటుమిల్లి)',
        },
        {
          Mandal_Code: '5004',
          MandalName: 'Bapulapadu (బాపులపాడు)',
        },
        {
          Mandal_Code: '5035',
          MandalName: 'Challapalli (చల్లపల్లె)',
        },
        {
          Mandal_Code: '5012',
          MandalName: 'Gannavaram (గన్నవరం)',
        },
        {
          Mandal_Code: '5033',
          MandalName: 'Ghantasala (ఘంటశాల)',
        },
        {
          Mandal_Code: '5021',
          MandalName: 'Gudivada (గుడివాడ)',
        },
        {
          Mandal_Code: '5029',
          MandalName: 'Gudlavalleru (గుడ్లవల్లేరు)',
        },
        {
          Mandal_Code: '5031',
          MandalName: 'Gudur (గూడూరు)',
        },
        {
          Mandal_Code: '5023',
          MandalName: 'Kankipadu (కంకిపాడు)',
        },
        {
          Mandal_Code: '5039',
          MandalName: 'Koduru (కోడూరు)',
        },
        {
          Mandal_Code: '5018',
          MandalName: 'Kruthivennu (కృతివెన్ను)',
        },
        {
          Mandal_Code: '5034',
          MandalName: 'Machilipatnam (మచిలీపట్నం)',
        },
        {
          Mandal_Code: '5036',
          MandalName: 'Mopidevi (మోపిదేవి)',
        },
        {
          Mandal_Code: '5032',
          MandalName: 'Movva (మొవ్వ)',
        },
        {
          Mandal_Code: '5038',
          MandalName: 'Nagayalanka (నాగయలంక)',
        },
        {
          Mandal_Code: '5014',
          MandalName: 'Nandivada (నందివాడ)',
        },
        {
          Mandal_Code: '5028',
          MandalName: 'Pamarru (పామర్రు)',
        },
        {
          Mandal_Code: '5026',
          MandalName: 'Pamidimukkala (పమిడిముక్కల)',
        },
        {
          Mandal_Code: '5030',
          MandalName: 'Pedana (పెడన)',
        },
        {
          Mandal_Code: '5022',
          MandalName: 'Pedaparupudi (పెదపారుపూడి)',
        },
        {
          Mandal_Code: '5024',
          MandalName: 'Penamaluru (పెనమలూరు)',
        },
        {
          Mandal_Code: '5025',
          MandalName: 'Thotlavalluru (తోట్లవల్లూరు)',
        },
        {
          Mandal_Code: '5013',
          MandalName: 'Unguturu (ఉంగుటూరు)',
        },
        {
          Mandal_Code: '5027',
          MandalName: 'Vuyyuru (ఉయ్యూరు)',
        },
      ],
    },
    {
      DistrictName: 'KURNOOL',
      DistrictCode: '511',
      Get_mandals: [
        {
          Mandal_Code: '5271',
          MandalName: 'Adoni (ఆదోని)',
        },
        {
          Mandal_Code: '5274',
          MandalName: 'Alur (ఆలూరు)',
        },
        {
          Mandal_Code: '5275',
          MandalName: 'Aspari (ఆస్పరి)',
        },
        {
          Mandal_Code: '5256',
          MandalName: 'C.BELAGAL (సి.బెళగల్)',
        },
        {
          Mandal_Code: '5291',
          MandalName: 'CHIPPAGIRI (చిప్పగిరి)',
        },
        {
          Mandal_Code: '5276',
          MandalName: 'DEVANAKONDA (దేవనకొండ)',
        },
        {
          Mandal_Code: '5270',
          MandalName: 'GONEGANDLA (గోనెగండ్ల)',
        },
        {
          Mandal_Code: '5257',
          MandalName: 'GUDUR (గూడూరు)',
        },
        {
          Mandal_Code: '5273',
          MandalName: 'HALAHARVI (హాలహర్వి)',
        },
        {
          Mandal_Code: '5272',
          MandalName: 'HOLAGUNDA (హొలగుండ)',
        },
        {
          Mandal_Code: '5258',
          MandalName: 'KALLUR (కల్లూరు .)',
        },
        {
          Mandal_Code: '5269',
          MandalName: 'KODUMUR (కోడుమూరు)',
        },
        {
          Mandal_Code: '5251',
          MandalName: 'KOSIGI (కోసిగి)',
        },
        {
          Mandal_Code: '5252',
          MandalName: 'KOWTHALAM (కౌతాళం)',
        },
        {
          Mandal_Code: '5277',
          MandalName: 'KRISHNAGIRI (క్రిష్ణగిరి)',
        },
        {
          Mandal_Code: '5259',
          MandalName: 'KURNOOL (కర్నూలు)',
        },
        {
          Mandal_Code: '5292',
          MandalName: 'Maddikera East (మద్దికెర)',
        },
        {
          Mandal_Code: '5250',
          MandalName: 'Mantralayam (మంత్రాలయం)',
        },
        {
          Mandal_Code: '5255',
          MandalName: 'Nandavaram (నందవరం)',
        },
        {
          Mandal_Code: '5268',
          MandalName: 'Orvakal (ఓర్వకల్లు)',
        },
        {
          Mandal_Code: '5290',
          MandalName: 'Pattikonda (పత్తికొండ )',
        },
        {
          Mandal_Code: '5253',
          MandalName: 'Pedda Kadubur (పెద్ద కడుబూరు)',
        },
        {
          Mandal_Code: '5293',
          MandalName: 'Tuggali (తుగ్గలి)',
        },
        {
          Mandal_Code: '5278',
          MandalName: 'Veldurthi (వెల్దుర్తి)',
        },
        {
          Mandal_Code: '5254',
          MandalName: 'Yemmiganur (ఎమ్మిగనూరు)',
        },
      ],
    },
    {
      DistrictName: 'NANDYAL',
      DistrictCode: '755',
      Get_mandals: [
        {
          Mandal_Code: '5298',
          MandalName: 'Allagadda (ఆళ్లగడ్డ)',
        },
        {
          Mandal_Code: '5265',
          MandalName: 'Atmakur (ఆత్మకూరు)',
        },
        {
          Mandal_Code: '5288',
          MandalName: 'Banaganapalle (బనగానపల్లె)',
        },
        {
          Mandal_Code: '5283',
          MandalName: 'BANDI ATMAKUR (బండి ఆత్మకూరు)',
        },
        {
          Mandal_Code: '5279',
          MandalName: 'BETHAMCHERLA (బెతంచెర్ల)',
        },
        {
          Mandal_Code: '5303',
          MandalName: 'CHAGALAMARRI (చాగలమర్రి)',
        },
        {
          Mandal_Code: '5289',
          MandalName: 'DHONE (డోను)',
        },
        {
          Mandal_Code: '5299',
          MandalName: 'DORNIPADU (దొర్నిపాడు .)',
        },
        {
          Mandal_Code: '5281',
          MandalName: 'GADIVEMULA (గడివేముల)',
        },
        {
          Mandal_Code: '5287',
          MandalName: 'GOSPADU (గోస్పాడు)',
        },
        {
          Mandal_Code: '5262',
          MandalName: 'Jupadu Bungalow (జూపాడు బంగ్లా)',
        },
        {
          Mandal_Code: '5296',
          MandalName: 'KOILKUNTLA (కోయిలకుంట్ల  .)',
        },
        {
          Mandal_Code: '5301',
          MandalName: 'KOLIMIGUNDLA (కొలిమిగుండ్ల  .)',
        },
        {
          Mandal_Code: '5263',
          MandalName: 'KOTHAPALLE (కొత్తపల్లె)',
        },
        {
          Mandal_Code: '5285',
          MandalName: 'Mahanandi (మహానంది)',
        },
        {
          Mandal_Code: '5267',
          MandalName: 'Midthur (మిడ్తూరు)',
        },
        {
          Mandal_Code: '5260',
          MandalName: 'Nandi Kotkur (నందికోట్కూరు)',
        },
        {
          Mandal_Code: '5284',
          MandalName: 'Nandyal (నంద్యాల)',
        },
        {
          Mandal_Code: '5295',
          MandalName: 'OWK (ఔకు)',
        },
        {
          Mandal_Code: '5261',
          MandalName: 'Pagidyala (పగిడ్యాల)',
        },
        {
          Mandal_Code: '5266',
          MandalName: 'Pamulapadu (పాములపాడు)',
        },
        {
          Mandal_Code: '5280',
          MandalName: 'Panyam (పాణ్యం)',
        },
        {
          Mandal_Code: '5294',
          MandalName: 'Peapally (ప్యాపిలి)',
        },
        {
          Mandal_Code: '5297',
          MandalName: 'Rudravaram (రుద్రవరం)',
        },
        {
          Mandal_Code: '5300',
          MandalName: 'Sanjamala (సంజామల)',
        },
        {
          Mandal_Code: '5286',
          MandalName: 'Sirvel (శిరివెళ్ళ)',
        },
        {
          Mandal_Code: '6538',
          MandalName: 'SRISAILAM (శ్రీశైలం)',
        },
        {
          Mandal_Code: '5302',
          MandalName: 'Uyyalawada (ఉయ్యాలవాడ)',
        },
        {
          Mandal_Code: '5282',
          MandalName: 'Velgoddu (వెలుగోడు)',
        },
      ],
    },
    {
      DistrictName: 'NTR',
      DistrictCode: '749',
      Get_mandals: [
        {
          Mandal_Code: '4998',
          MandalName: 'A Konduru (ఎ.కొండూరు)',
        },
        {
          Mandal_Code: '4998',
          MandalName: 'A.Konduru (ఎ.కొండూరు)',
        },
        {
          Mandal_Code: '5008',
          MandalName: 'Chandarlapadu (చందర్లపాడు)',
        },
        {
          Mandal_Code: '5006',
          MandalName: 'G Konduru (జి.కొండూరు)',
        },
        {
          Mandal_Code: '4996',
          MandalName: 'Gampalagudem (గంపలగూడెం)',
        },
        {
          Mandal_Code: '5009',
          MandalName: 'Ibrahimpatnam (ఇబ్రహీంపట్నం)',
        },
        {
          Mandal_Code: '4991',
          MandalName: 'Jaggayyapeta (జగ్గయ్యపేట)',
        },
        {
          Mandal_Code: '5007',
          MandalName: 'Kanchikacherla (కంచికచర్ల)',
        },
        {
          Mandal_Code: '4995',
          MandalName: 'Mylavaram (మైలవరం)',
        },
        {
          Mandal_Code: '4993',
          MandalName: 'Nandigama (నందిగామ)',
        },
        {
          Mandal_Code: '4992',
          MandalName: 'Penuganchiprolu (పెనుగంచిప్రోలు)',
        },
        {
          Mandal_Code: '4999',
          MandalName: 'Reddigudem (రెడ్డిగూడెం)',
        },
        {
          Mandal_Code: '4997',
          MandalName: 'Tiruvuru (తిరువూరు)',
        },
        {
          Mandal_Code: '4990',
          MandalName: 'Vatsavai (వత్సవాయ్)',
        },
        {
          Mandal_Code: '4994',
          MandalName: 'Veerullapadu (వీరుల్లపాడు)',
        },
        {
          Mandal_Code: '5010',
          MandalName: 'Vijayawada Central (విజయవాడ సెంట్రల్)',
        },
        {
          Mandal_Code: '6863',
          MandalName: 'VIJAYAWADA EAST (విజయవాడ తూర్పు)',
        },
        {
          Mandal_Code: '6864',
          MandalName: 'VIJAYAWADA NORTH (విజయవాడ నార్త్)',
        },
        {
          Mandal_Code: '5011',
          MandalName: 'Vijayawada Rural (విజయవాడ రూరల్)',
        },
        {
          Mandal_Code: '6865',
          MandalName: 'VIJAYAWADA WEST (విజయవాడ వెస్ట్)',
        },
        {
          Mandal_Code: '5000',
          MandalName: 'Vissannapet (విస్సన్నపేట)',
        },
      ],
    },

    {
      DistrictName: 'PALNADU',
      DistrictCode: '751',
      Get_mandals: [
        {
          Mandal_Code: '5050',
          MandalName: 'Achampeta (అచ్చంపేట)',
        },
        {
          Mandal_Code: '5052',
          MandalName: 'Amaravathi (అమరావతి)',
        },
        {
          Mandal_Code: '5049',
          MandalName: 'Bellamkonda (బెల్లంకొండ)',
        },
        {
          Mandal_Code: '5061',
          MandalName: 'Bollapalle (బోల్లాపల్లె)',
        },
        {
          Mandal_Code: '5070',
          MandalName: 'Chilakaluripet (చిలకలూరి పేట )',
        },
        {
          Mandal_Code: '5045',
          MandalName: 'Dachepalle (దాచెపల్లి)',
        },
        {
          Mandal_Code: '5042',
          MandalName: 'Durgi (దుర్గి)',
        },
        {
          Mandal_Code: '5071',
          MandalName: 'Edlapadu (ఎడ్లపాడు)',
        },
        {
          Mandal_Code: '5044',
          MandalName: 'Gurazala (గురజాల)',
        },
        {
          Mandal_Code: '5065',
          MandalName: 'Ipuru (ఈపూరు)',
        },
        {
          Mandal_Code: '5046',
          MandalName: 'Karempudi (కారంపూడి)',
        },
        {
          Mandal_Code: '5051',
          MandalName: 'Krosuru (క్రోసూరు)',
        },
        {
          Mandal_Code: '5048',
          MandalName: 'Machavaram (మాచవరం)',
        },
        {
          Mandal_Code: '5040',
          MandalName: 'Macherla (మాచర్ల)',
        },
        {
          Mandal_Code: '5068',
          MandalName: 'Muppalla (ముప్పాళ్ళ)',
        },
        {
          Mandal_Code: '5069',
          MandalName: 'Nadendla (నాదెండ్ల)',
        },
        {
          Mandal_Code: '5060',
          MandalName: 'Nakarikallu (నెకరికల్లు)',
        },
        {
          Mandal_Code: '5067',
          MandalName: 'Narasaraopeta (నరసరావుపేట)',
        },
        {
          Mandal_Code: '5063',
          MandalName: 'Nuzendla (నూజెండ్ల)',
        },
        {
          Mandal_Code: '5057',
          MandalName: 'Pedakurapadu (పెదకూరపాడు)',
        },
        {
          Mandal_Code: '5047',
          MandalName: 'Piduguralla (పిడుగురాళ్ళ)',
        },
        {
          Mandal_Code: '5059',
          MandalName: 'Rajupalem (రాజుపాలెం)',
        },
        {
          Mandal_Code: '5043',
          MandalName: 'Rentachintala (రెంటచింతల)',
        },
        {
          Mandal_Code: '5066',
          MandalName: 'Rompicherla (రొంపిచెర్ల)',
        },
        {
          Mandal_Code: '5058',
          MandalName: 'Sattenapalle (సత్తెనపల్లి)',
        },
        {
          Mandal_Code: '5064',
          MandalName: 'Savalyapuram (శ్యావల్యాపురం)',
        },
        {
          Mandal_Code: '5041',
          MandalName: 'Veldurthi (వలుదుర్తి)',
        },
        {
          Mandal_Code: '5062',
          MandalName: 'Vinukonda (వినుకొండ)',
        },
      ],
    },
    {
      DistrictName: 'PARVATHIPURAM MANYAM',
      DistrictCode: '743',
      Get_mandals: [
        {
          Mandal_Code: '4815',
          MandalName: 'Balijapeta (బలిజిపేట)',
        },
        {
          Mandal_Code: '4771',
          MandalName: 'Bhamini (భామిని)',
        },
        {
          Mandal_Code: '4811',
          MandalName: 'Garugubilli (గరుగుబిల్లి)',
        },
        {
          Mandal_Code: '4808',
          MandalName: 'Gummalakshmipuram (గుమ్మలక్ష్మిపురం)',
        },
        {
          Mandal_Code: '4810',
          MandalName: 'Jiyyamma Valasa (జియ్యమ్మవలస)',
        },
        {
          Mandal_Code: '4807',
          MandalName: 'Komarada (కొమరాడ)',
        },
        {
          Mandal_Code: '4809',
          MandalName: 'Kurupam (కురుపాం)',
        },
        {
          Mandal_Code: '4813',
          MandalName: 'Makkuva (మక్కువ)',
        },
        {
          Mandal_Code: '4818',
          MandalName: 'Pachipenta (పాచిపెంట)',
        },
        {
          Mandal_Code: '4784',
          MandalName: 'Palakonda ( పాలకొండ)',
        },
        {
          Mandal_Code: '4812',
          MandalName: 'Parvathipuram (పార్వతీపురం)',
        },
        {
          Mandal_Code: '4817',
          MandalName: 'Salur (సాలూరు)',
        },
        {
          Mandal_Code: '4770',
          MandalName: 'Seethampeta (సీతంపేట)',
        },
        {
          Mandal_Code: '4814',
          MandalName: 'Seethanagaram (సీతానగరం)',
        },
        {
          Mandal_Code: '4785',
          MandalName: 'Vangara (వంగర)',
        },
        {
          Mandal_Code: '4769',
          MandalName: 'Veeraghattam (వీరఘట్టం)',
        },
      ],
    },
    {
      DistrictName: 'PRAKASAM',
      DistrictCode: '517',
      Get_mandals: [
        {
          Mandal_Code: '5116',
          MandalName: 'Ardhaveedu (అర్థవీడు)',
        },
        {
          Mandal_Code: '5131',
          MandalName: 'Bestavaripeta (బెస్తవారిపేట)',
        },
        {
          Mandal_Code: '5145',
          MandalName: 'Chadrasekarapuram (చంద్రశేఖరపురం)',
        },
        {
          Mandal_Code: '5128',
          MandalName: 'Chimakurthi (చీమకుర్తి)',
        },
        {
          Mandal_Code: '5117',
          MandalName: 'Cumbum (కంభం)',
        },
        {
          Mandal_Code: '5114',
          MandalName: 'Darsi (దరిశి)',
        },
        {
          Mandal_Code: '5102',
          MandalName: 'Donakonda (దొనకొండ)',
        },
        {
          Mandal_Code: '5100',
          MandalName: 'Dornala (దోర్నాల)',
        },
        {
          Mandal_Code: '5133',
          MandalName: 'Giddaluru (గిద్దలూరు)',
        },
        {
          Mandal_Code: '5130',
          MandalName: 'Hanumanthunipadu (హనుమంతునిపాడు)',
        },
        {
          Mandal_Code: '5136',
          MandalName: 'Kanigiri (కనిగిరి)',
        },
        {
          Mandal_Code: '5134',
          MandalName: 'Komarolu (కొమరోలు)',
        },
        {
          Mandal_Code: '5119',
          MandalName: 'Konakanamitla (కొనకనమిట్ట)',
        },
        {
          Mandal_Code: '5137',
          MandalName: 'Kondapi (కొండపి)',
        },
        {
          Mandal_Code: '5140',
          MandalName: 'Kothapatnam (కొత్తపట్టణం)',
        },
        {
          Mandal_Code: '5103',
          MandalName: 'Kurichedu (కురిచేడు)',
        },
        {
          Mandal_Code: '5127',
          MandalName: 'Maddipadu (మద్దిపాడు)',
        },
        {
          Mandal_Code: '5115',
          MandalName: 'Markapur (మార్కాపురం)',
        },
        {
          Mandal_Code: '5129',
          MandalName: 'Marripudi (మర్రిపూడి)',
        },
        {
          Mandal_Code: '5113',
          MandalName: 'Mundlamuru (ముండ్లమూరు)',
        },
        {
          Mandal_Code: '5126',
          MandalName: 'Naguluppalapadu (నాగలుప్పలపాడు)',
        },
        {
          Mandal_Code: '5139',
          MandalName: 'Ongole (ఒంగోలు)',
        },
        {
          Mandal_Code: '5146',
          MandalName: 'Pamur (పామూరు)',
        },
        {
          Mandal_Code: '5101',
          MandalName: 'Pedaaraveedu (పెద్దారవీడు)',
        },
        {
          Mandal_Code: '5144',
          MandalName: 'Pedacherlopalle (పెదచెర్లోపల్లి)',
        },
        {
          Mandal_Code: '5120',
          MandalName: 'Podili (పోదిలి)',
        },
        {
          Mandal_Code: '5143',
          MandalName: 'Ponnaluru (పొన్నలూరు)',
        },
        {
          Mandal_Code: '5098',
          MandalName: 'Pullalacheruvu (పుల్లలచెరువు)',
        },
        {
          Mandal_Code: '5132',
          MandalName: 'Racherla (రాచర్ల)',
        },
        {
          Mandal_Code: '5138',
          MandalName: 'Santhanuthlapadu (సంతనూతలపాడు)',
        },
        {
          Mandal_Code: '5149',
          MandalName: 'Singarayakonda (శింగరాయకొండ)',
        },
        {
          Mandal_Code: '5141',
          MandalName: 'Tangutur (టంగుటూరు)',
        },
        {
          Mandal_Code: '5118',
          MandalName: 'Tarlapadu (తర్లుపాడు)',
        },
        {
          Mandal_Code: '5121',
          MandalName: 'Thallur (తాళ్లూరు)',
        },
        {
          Mandal_Code: '5099',
          MandalName: 'Tripuranthakam (త్రిపురాంతకం)',
        },
        {
          Mandal_Code: '5152',
          MandalName: 'Ulavapadu (ఉలవపాడు)',
        },
        {
          Mandal_Code: '5135',
          MandalName: 'Veligandla (వెలిగండ్ల)',
        },
        {
          Mandal_Code: '5097',
          MandalName: 'Yerragondapalem (యర్రగొండపాలెం)',
        },
        {
          Mandal_Code: '5142',
          MandalName: 'Zarugumilli (జరుగుమల్లి)',
        },
      ],
    },
    {
      DistrictName: 'SPR NELLORE',
      DistrictCode: '515',
      Get_mandals: [
        {
          Mandal_Code: '5167',
          MandalName: 'Allur (అల్లూరు)',
        },
        {
          Mandal_Code: '5173',
          MandalName: 'Ananthasagaram (అనంతసాగరం)',
        },
        {
          Mandal_Code: '5165',
          MandalName: 'Anumasamudrampeta (అనుమసముద్రంపేట)',
        },
        {
          Mandal_Code: '5164',
          MandalName: 'Atmakur (అత్మకూరు)',
        },
        {
          Mandal_Code: '5159',
          MandalName: 'Bogole (బోగోలు)',
        },
        {
          Mandal_Code: '5170',
          MandalName: 'Butchireddipalem (బుచ్చిరెడ్డిపాలెం)',
        },
        {
          Mandal_Code: '5172',
          MandalName: 'Chejerla (చేజర్ల)',
        },
        {
          Mandal_Code: '5166',
          MandalName: 'Dagadarthi (దగదర్తి)',
        },
        {
          Mandal_Code: '5162',
          MandalName: 'Duttalur (దుత్తలూరు)',
        },
        {
          Mandal_Code: '5151',
          MandalName: 'Gudluru (గుడ్లూరు)',
        },
        {
          Mandal_Code: '5179',
          MandalName: 'Indukurpet (ఇందుకూరుపేట)',
        },
        {
          Mandal_Code: '5157',
          MandalName: 'Jaladanki (జలదంకి)',
        },
        {
          Mandal_Code: '5160',
          MandalName: 'Kaligiri (కలిగిరి)',
        },
        {
          Mandal_Code: '5174',
          MandalName: 'Kaluvoya (కలువాయి)',
        },
        {
          Mandal_Code: '5148',
          MandalName: 'Kandukur (కందుకూరు)',
        },
        {
          Mandal_Code: '5158',
          MandalName: 'Kavali (కావలి)',
        },
        {
          Mandal_Code: '5169',
          MandalName: 'Kodavalur (కొడవలూరు)',
        },
        {
          Mandal_Code: '5156',
          MandalName: 'Kondapuram (కొండాపురం)',
        },
        {
          Mandal_Code: '5178',
          MandalName: 'Kovur (కోవూరు.)',
        },
        {
          Mandal_Code: '5150',
          MandalName: 'Lingasamudram (లింగసముద్రం)',
        },
        {
          Mandal_Code: '5183',
          MandalName: 'Manubolu (మనుబోలు)',
        },
        {
          Mandal_Code: '5163',
          MandalName: 'Marripadu (మర్రిపాడు)',
        },
        {
          Mandal_Code: '5181',
          MandalName: 'Muthukur (ముత్తుకూరు)',
        },
        {
          Mandal_Code: '5177',
          MandalName: 'Nellore (నెల్లూరు)',
        },
        {
          Mandal_Code: '7182',
          MandalName: 'Nellore Urban (నెల్లూరు అర్బన్)',
        },
        {
          Mandal_Code: '5176',
          MandalName: 'PODALAKUR (పొదలకూరు)',
        },
        {
          Mandal_Code: '5175',
          MandalName: 'Rapur (రాపూరు)',
        },
        {
          Mandal_Code: '5171',
          MandalName: 'Sangam (సంగం)',
        },
        {
          Mandal_Code: '5153',
          MandalName: 'Seetharamapuram (సీతారామపురం)',
        },
        {
          Mandal_Code: '5185',
          MandalName: 'Sydapuram (సైదాపురం)',
        },
        {
          Mandal_Code: '5180',
          MandalName: 'Thotapalligudur (తోటపల్లి గూడూరు)',
        },
        {
          Mandal_Code: '5154',
          MandalName: 'Udayagiri (ఉదయగిరి)',
        },
        {
          Mandal_Code: '5152',
          MandalName: 'Ulavapadu (ఉలవపాడు)',
        },
        {
          Mandal_Code: '5155',
          MandalName: 'Varikuntapadu (వరికుంటపాడు)',
        },
        {
          Mandal_Code: '5182',
          MandalName: 'Venkatachalam (వెంకటాచలం)',
        },
        {
          Mandal_Code: '5168',
          MandalName: 'VIDAVALUR (విడవలూరు)',
        },
        {
          Mandal_Code: '5161',
          MandalName: 'Vinjamur (వింజమూరు)',
        },
        {
          Mandal_Code: '5147',
          MandalName: 'Voletivaripalem (వలేటివారిపాలెం)',
        },
        {
          Mandal_Code: '5148',
          MandalName: 'Voletivaripalem (వలేటివారిపాలెం)',
        },
      ],
    },
    {
      DistrictName: 'SRIKAKULAM',
      DistrictCode: '519',
      Get_mandals: [
        {
          Mandal_Code: '4798',
          MandalName: 'Amadalavalasa (ఆమదాలవలస)',
        },
        {
          Mandal_Code: '4794',
          MandalName: 'Burja (బూర్జ)',
        },
        {
          Mandal_Code: '4806',
          MandalName: 'Etcherla (ఎచ్చర్ల)',
        },
        {
          Mandal_Code: '4797',
          MandalName: 'Ganguvari Singadam (గంగువారిసిగాడాం)',
        },
        {
          Mandal_Code: '4801',
          MandalName: 'Gara (గార)',
        },
        {
          Mandal_Code: '4783',
          MandalName: 'Hiramandalam (హిరమండలం)',
        },
        {
          Mandal_Code: '4778',
          MandalName: 'Ichchapuram (ఇచ్చాపురం)',
        },
        {
          Mandal_Code: '4792',
          MandalName: 'Jalumuru (జలుమూరు)',
        },
        {
          Mandal_Code: '4777',
          MandalName: 'Kanchili (కంచిలి)',
        },
        {
          Mandal_Code: '4779',
          MandalName: 'Kaviti (కవిటి)',
        },
        {
          Mandal_Code: '4791',
          MandalName: 'Kotabommali (కోటబోమ్మాళి)',
        },
        {
          Mandal_Code: '4772',
          MandalName: 'Kothuru ( కొత్తూరు)',
        },
        {
          Mandal_Code: '4787',
          MandalName: 'Lakshminarsupeta (లక్ష్మీనర్సుపేట)',
        },
        {
          Mandal_Code: '4804',
          MandalName: 'Laveru (లావేరు)',
        },
        {
          Mandal_Code: '4776',
          MandalName: 'Mandasa (మందస)',
        },
        {
          Mandal_Code: '4774',
          MandalName: 'Meilaputti (మెళియాపుట్టి)',
        },
        {
          Mandal_Code: '4782',
          MandalName: 'Nandigam (నందిగాం)',
        },
        {
          Mandal_Code: '4799',
          MandalName: 'Narasannapeta (నరసన్నపేట)',
        },
        {
          Mandal_Code: '4775',
          MandalName: 'Palasa (పలాస)',
        },
        {
          Mandal_Code: '4773',
          MandalName: 'Pathapatnam (పాతపట్నం)',
        },
        {
          Mandal_Code: '4800',
          MandalName: 'Polaki (పోలాకి)',
        },
        {
          Mandal_Code: '4803',
          MandalName: 'Ponduru ( పొందూరు)',
        },
        {
          Mandal_Code: '4805',
          MandalName: 'Ranastalam (రణస్దలం)',
        },
        {
          Mandal_Code: '4790',
          MandalName: 'Santhabommali (సంతబోమ్మలి)',
        },
        {
          Mandal_Code: '4788',
          MandalName: 'Saravakota (సారవకోట)',
        },
        {
          Mandal_Code: '4793',
          MandalName: 'Sarubujjili (సరుబుజ్జిలి)',
        },
        {
          Mandal_Code: '4780',
          MandalName: 'Sompeta (సోంపేట)',
        },
        {
          Mandal_Code: '4802',
          MandalName: 'Srikakulam (శ్రీకాకుళం)',
        },
        {
          Mandal_Code: '4789',
          MandalName: 'Tekkali (టెక్కలి)',
        },
        {
          Mandal_Code: '4781',
          MandalName: 'Vajrapukothuru (వజ్రపుకAత్తూరు)',
        },
      ],
    },
    {
      DistrictName: 'SRI SATYA SAI',
      DistrictCode: '754',
      Get_mandals: [
        {
          Mandal_Code: '5354',
          MandalName: 'Agali (అగలి)',
        },
        {
          Mandal_Code: '5361',
          MandalName: 'Amadagur (ఆమడగూరు)',
        },
        {
          Mandal_Code: '5351',
          MandalName: 'Amarapuram (అమరాపురం)',
        },
        {
          Mandal_Code: '5337',
          MandalName: 'Bathalapalle (బత్తలపల్లి)',
        },
        {
          Mandal_Code: '5345',
          MandalName: 'Bukkapatnam (బుక్కపట్నం)',
        },
        {
          Mandal_Code: '5347',
          MandalName: 'Chenne Kothapalle (చెన్నేకొత్తపల్లి)',
        },
        {
          Mandal_Code: '5366',
          MandalName: 'Chilamathur (చిలమత్తూరు)',
        },
        {
          Mandal_Code: '5336',
          MandalName: 'Dharmavaram (దర్మవరం)',
        },
        {
          Mandal_Code: '5342',
          MandalName: 'Gandlapenta (గాండ్లపెంట)',
        },
        {
          Mandal_Code: '5362',
          MandalName: 'Gorantla (గోరంట్ల)',
        },
        {
          Mandal_Code: '5352',
          MandalName: 'Gudibanda (గుడిబండ)',
        },
        {
          Mandal_Code: '5364',
          MandalName: 'Hindupur (హిందూపురం)',
        },
        {
          Mandal_Code: '5343',
          MandalName: 'Kadiri (కదిరి)',
        },
        {
          Mandal_Code: '5335',
          MandalName: 'Kanaganapalle (కనగానిపల్లి)',
        },
        {
          Mandal_Code: '5346',
          MandalName: 'Kothacheruvu (కొత్తచెరువు)',
        },
        {
          Mandal_Code: '5365',
          MandalName: 'Lepakshi (లేపాక్షి)',
        },
        {
          Mandal_Code: '5350',
          MandalName: 'Madakasira (మడకశిర)',
        },
        {
          Mandal_Code: '5339',
          MandalName: 'Mudigubba (ముదిగుబ్బ )',
        },
        {
          Mandal_Code: '5359',
          MandalName: 'Nallacheruvu (నల్లచెరువు)',
        },
        {
          Mandal_Code: '5344',
          MandalName: 'Nallamada (నల్లమాడ)',
        },
        {
          Mandal_Code: '5341',
          MandalName: 'Nambulipulikunta (నంబులపూలికుంట)',
        },
        {
          Mandal_Code: '5358',
          MandalName: 'Obuladevaracheruvu (ఓబులదేవరచెరువు)',
        },
        {
          Mandal_Code: '5355',
          MandalName: 'Parigi (పరిగి)',
        },
        {
          Mandal_Code: '5356',
          MandalName: 'Penu Konda (పెనుకొండ)',
        },
        {
          Mandal_Code: '5357',
          MandalName: 'Puttaparthi (పుట్టపర్తి)',
        },
        {
          Mandal_Code: '5348',
          MandalName: 'Ramagiri (రామగిరి)',
        },
        {
          Mandal_Code: '5349',
          MandalName: 'Roddam (రొద్దం)',
        },
        {
          Mandal_Code: '5353',
          MandalName: 'Rolla (రోళ్ళ)',
        },
        {
          Mandal_Code: '5363',
          MandalName: 'Somandepalle (సోమందేపల్లి)',
        },
        {
          Mandal_Code: '5338',
          MandalName: 'Tadimarri (తాడిమర్రి)',
        },
        {
          Mandal_Code: '5340',
          MandalName: 'Talupula (తలుపుల)',
        },
        {
          Mandal_Code: '5360',
          MandalName: 'Tanakal (తనకల్లు)',
        },
      ],
    },
    {
      DistrictName: 'TIRUPATI',
      DistrictCode: '752',
      Get_mandals: [
        {
          Mandal_Code: '5188',
          MandalName: 'Balayapalle (బాలాయపల్లి)',
        },
        {
          Mandal_Code: '5380',
          MandalName: 'Buchinaidu Khandriga (బి.ఎన్.కండ్రిగ)',
        },
        {
          Mandal_Code: '5384',
          MandalName: 'Chandragiri (చంద్రగిరి)',
        },
        {
          Mandal_Code: '5190',
          MandalName: 'Chillakur (చిల్లకూరు)',
        },
        {
          Mandal_Code: '5385',
          MandalName: 'Chinnagottigallu (చిన్న గట్టిగల్లు)',
        },
        {
          Mandal_Code: '5193',
          MandalName: 'Chittamur (చిట్టమూరు)',
        },
        {
          Mandal_Code: '5186',
          MandalName: 'Dakkili (డక్కిలి)',
        },
        {
          Mandal_Code: '5196',
          MandalName: 'Doravarisatram (దోరవారిసత్రం)',
        },
        {
          Mandal_Code: '5184',
          MandalName: 'Gudur (గూడూరు)',
        },
        {
          Mandal_Code: '5382',
          MandalName: 'K V B Puram (కె.వి.బి.పురం)',
        },
        {
          Mandal_Code: '5191',
          MandalName: 'Kota (కోట)',
        },
        {
          Mandal_Code: '5403',
          MandalName: 'Nagalapuram (నాగలాపురం)',
        },
        {
          Mandal_Code: '5194',
          MandalName: 'Naidupeta (నాయుడుపేట)',
        },
        {
          Mandal_Code: '5400',
          MandalName: 'Narayanavanam (నారాయణవనం)',
        },
        {
          Mandal_Code: '5189',
          MandalName: 'Ojili (ఓజిలి)',
        },
        {
          Mandal_Code: '5396',
          MandalName: 'Pakala (పాకాల)',
        },
        {
          Mandal_Code: '5195',
          MandalName: 'Pellakur (పెళ్ళకూరు)',
        },
        {
          Mandal_Code: '5401',
          MandalName: 'Pichatur (పిచ్చాటూరు)',
        },
        {
          Mandal_Code: '5407',
          MandalName: 'Puttur (పుత్తూరు)',
        },
        {
          Mandal_Code: '5398',
          MandalName: 'Ramachandrapuram (రామచంద్రాపురం)',
        },
        {
          Mandal_Code: '5376',
          MandalName: 'Renigunta (రేణిగుంట)',
        },
        {
          Mandal_Code: '5402',
          MandalName: 'Satyavedu (సత్యవేడు)',
        },
        {
          Mandal_Code: '5378',
          MandalName: 'Srikalahasti (శ్రీకాళహస్తి)',
        },
        {
          Mandal_Code: '5197',
          MandalName: 'Sullurpeta (సూళ్ళూరుపేట)',
        },
        {
          Mandal_Code: '5198',
          MandalName: 'Tada (తడ)',
        },
        {
          Mandal_Code: '5379',
          MandalName: 'Thottambedu (తొట్టెంబేడు)',
        },
        {
          Mandal_Code: '5375',
          MandalName: 'Tirupati Rural (తిరుపతి (రూరల్))',
        },
        {
          Mandal_Code: '5383',
          MandalName: 'Tirupati Urban (తిరుపతి (అర్బన్))',
        },
        {
          Mandal_Code: '5399',
          MandalName: 'Vadamalapeta (వడమాలపేట)',
        },
        {
          Mandal_Code: '5192',
          MandalName: 'Vakadu (వాకాడు  )',
        },
        {
          Mandal_Code: '5381',
          MandalName: 'Varadaiahpalem (వరదయ్యపాలెం)',
        },
        {
          Mandal_Code: '5187',
          MandalName: 'Venkatagiri (వెంకటగిరి)',
        },
        {
          Mandal_Code: '5377',
          MandalName: 'Yerpedu (ఏర్పేడు)',
        },
        {
          Mandal_Code: '5374',
          MandalName: 'Yerravaripalem (యర్రావారిపాలెం)',
        },
      ],
    },
    {
      DistrictName: 'VISAKHAPATNAM',
      DistrictCode: '520',
      Get_mandals: [
        {
          Mandal_Code: 'M002',
          MandalName: '',
        },
        {
          Mandal_Code: '4863',
          MandalName: 'Anandapuram (అనందపురం)',
        },
        {
          Mandal_Code: '4863',
          MandalName: 'Anandapuram (ఆనందపురం)',
        },
        {
          Mandal_Code: '4845',
          MandalName: 'Ananthagiri (అనంతగిరి)',
        },
        {
          Mandal_Code: '4844',
          MandalName: 'Araku Valley (అరుకువేలీ)',
        },
        {
          Mandal_Code: '4865',
          MandalName: 'Bheemunipatnam (భీమునిపట్నం)',
        },
        {
          Mandal_Code: '4849',
          MandalName: 'Chintapalle (చింతపల్లి)',
        },
        {
          Mandal_Code: '4843',
          MandalName: 'Dumbriguda (డుంబ్రిగుడ)',
        },
        {
          Mandal_Code: '4869',
          MandalName: 'Gajuwaka (గాజువాక)',
        },
        {
          Mandal_Code: '4848',
          MandalName: 'Gangaraju Madugula (జి.మాడుగుల)',
        },
        {
          Mandal_Code: '6838',
          MandalName: 'Gopalapatnam (గోపాలపట్నం)',
        },
        {
          Mandal_Code: '4850',
          MandalName: 'Gudem Kothaveedhi (జి.కె.వీది)',
        },
        {
          Mandal_Code: '4846',
          MandalName: 'Hukumpeta (హుక్కుంపేట)',
        },
        {
          Mandal_Code: '4851',
          MandalName: 'Koyyuru ( కొయ్యూరు)',
        },
        {
          Mandal_Code: '6837',
          MandalName: 'Maharanipeta (మహారాణిపేట)',
        },
        {
          Mandal_Code: '6839',
          MandalName: 'Mulagada (ములగడ)',
        },
        {
          Mandal_Code: '4841',
          MandalName: 'Munchingput (ముంచంగిపుట్టు)',
        },
        {
          Mandal_Code: '4847',
          MandalName: 'Paderu (పాడేరు)',
        },
        {
          Mandal_Code: '4864',
          MandalName: 'Padmanabham (పధ్మనాభం)',
        },
        {
          Mandal_Code: '4842',
          MandalName: 'Pedabayalu (పెదబయలు)',
        },
        {
          Mandal_Code: '4868',
          MandalName: 'Pedagantyada (పెద గంట్యాడ)',
        },
        {
          Mandal_Code: '4862',
          MandalName: 'Pendurthi (పెందుర్తి)',
        },
        {
          Mandal_Code: '6836',
          MandalName: 'Seethammadhara (సీతమ్మధార)',
        },
        {
          Mandal_Code: '4866',
          MandalName: 'Visakhapatnam(R) (విశాఖపట్నం(రూరల్))',
        },
        {
          Mandal_Code: '4867',
          MandalName: 'Visakhapatnam(U) (విశాఖపట్నం(U))',
        },
      ],
    },
    {
      DistrictName: 'VIZIANAGARAM',
      DistrictCode: '521',
      Get_mandals: [
        {
          Mandal_Code: '4820',
          MandalName: 'Badangi (బాడంగి)',
        },
        {
          Mandal_Code: '4840',
          MandalName: 'Bhoghapuram (భోగాపురం )',
        },
        {
          Mandal_Code: '4816',
          MandalName: 'Bobbili ( బొబ్బిలి)',
        },
        {
          Mandal_Code: '4816',
          MandalName: 'Bobbili (బొబ్బిలి)',
        },
        {
          Mandal_Code: '4829',
          MandalName: 'Bondapalle (బొండపల్లి)',
        },
        {
          Mandal_Code: '4827',
          MandalName: 'Cheepurupalle (చీపురుపల్లి)',
        },
        {
          Mandal_Code: '4823',
          MandalName: 'Dattirajeru (దత్తిరాజేరు)',
        },
        {
          Mandal_Code: '4839',
          MandalName: 'Denkada (డెంకాడ)',
        },
        {
          Mandal_Code: '4825',
          MandalName: 'Gajapathinagaram (గజపతినగరం)',
        },
        {
          Mandal_Code: '4830',
          MandalName: 'Gantyada (గంట్యాడ)',
        },
        {
          Mandal_Code: '4826',
          MandalName: 'Garividi (గరివిడి)',
        },
        {
          Mandal_Code: '4828',
          MandalName: 'Gurla (గుర్ల)',
        },
        {
          Mandal_Code: '4835',
          MandalName: 'Jami (జామి)',
        },
        {
          Mandal_Code: '4834',
          MandalName: 'Kothavalasa ( కొత్తవలస)',
        },
        {
          Mandal_Code: '4833',
          MandalName: 'Lakkavarapukota (లక్కవరపుకోట)',
        },
        {
          Mandal_Code: '4824',
          MandalName: 'Mentada (మెంటాడ)',
        },
        {
          Mandal_Code: '4822',
          MandalName: 'Merakamudidam (మెరకముడిదాం)',
        },
        {
          Mandal_Code: '4837',
          MandalName: 'Nellimarla (నెల్లిమర్ల)',
        },
        {
          Mandal_Code: '4838',
          MandalName: 'Pusapatirega (పూసపాటిరేగ)',
        },
        {
          Mandal_Code: '4796',
          MandalName: 'Rajam (రాజాం)',
        },
        {
          Mandal_Code: '4819',
          MandalName: 'Ramabhadrapuram (రామభధ్రపురం)',
        },
        {
          Mandal_Code: '4786',
          MandalName: 'Regidiamadalavalasa (రేగిడి ఆమదాలవలస)',
        },
        {
          Mandal_Code: '4795',
          MandalName: 'Santhakaviti (సంతకవిటి)',
        },
        {
          Mandal_Code: '4831',
          MandalName: 'Srungavarapukota (శృంగవరపు కోట )',
        },
        {
          Mandal_Code: '4821',
          MandalName: 'Therlam (తెర్లాం)',
        },
        {
          Mandal_Code: '4785',
          MandalName: 'Vangara (వంగర)',
        },
        {
          Mandal_Code: '4832',
          MandalName: 'Vepada (వేపాడ)',
        },
        {
          Mandal_Code: '4836',
          MandalName: 'Vizianagaram (విజయనగరం)',
        },
      ],
    },
    {
      DistrictName: 'WEST GODAVARI',
      DistrictCode: '523',
      Get_mandals: [
        {
          Mandal_Code: '4981',
          MandalName: 'Achanta (ఆచంట)',
        },
        {
          Mandal_Code: '4975',
          MandalName: 'Akiveedu (ఆకివీడు)',
        },
        {
          Mandal_Code: '4973',
          MandalName: 'Attili (అత్తిలి)',
        },
        {
          Mandal_Code: '4984',
          MandalName: 'Bheemavaram (భీమవరం)',
        },
        {
          Mandal_Code: '4979',
          MandalName: 'Iragavaram (ఇరగవరం)',
        },
        {
          Mandal_Code: '4985',
          MandalName: 'Kalla (కాళ్ల)',
        },
        {
          Mandal_Code: '4986',
          MandalName: 'Mogalthur (మొగల్తూరు)',
        },
        {
          Mandal_Code: '4987',
          MandalName: 'Narasapuram (నర్సాపురం)',
        },
        {
          Mandal_Code: '4988',
          MandalName: 'Palacole (పాలకొల్లు)',
        },
        {
          Mandal_Code: '4977',
          MandalName: 'Palakoderu (పాలకోడేరు)',
        },
        {
          Mandal_Code: '4969',
          MandalName: 'Pentapadu (పెంటపాడు)',
        },
        {
          Mandal_Code: '4980',
          MandalName: 'Penugonda (పెనుగొండ)',
        },
        {
          Mandal_Code: '4978',
          MandalName: 'Penumantra (పెనుమంట్ర)',
        },
        {
          Mandal_Code: '4982',
          MandalName: 'Poduru (పోడూరు)',
        },
        {
          Mandal_Code: '4961',
          MandalName: 'Tadepalligudem (తాడేపల్లిగూడెం)',
        },
        {
          Mandal_Code: '4972',
          MandalName: 'Tanuku (తణుకు)',
        },
        {
          Mandal_Code: '4976',
          MandalName: 'Undi (ఉండి)',
        },
        {
          Mandal_Code: '4983',
          MandalName: 'Veeravasaram (వీరవాసరం)',
        },
        {
          Mandal_Code: '4989',
          MandalName: 'Yelamanchili (యలమంచిలి)',
        },
      ],
    },
    {
      DistrictName: 'YSR KADAPA',
      DistrictCode: '504',
      Get_mandals: [
        {
          Mandal_Code: '5227',
          MandalName: 'Atlur (అట్లూరు)',
        },
        {
          Mandal_Code: '5209',
          MandalName: 'B Kodur (బి.కోడూరు)',
        },
        {
          Mandal_Code: '5210',
          MandalName: 'Badvel (బద్వేల్)',
        },
        {
          Mandal_Code: '5205',
          MandalName: 'Brahmamgarimattam (బ్రహ్మంగారి మఠం)',
        },
        {
          Mandal_Code: '5234',
          MandalName: 'Chakrayapet (చక్రాయపేట)',
        },
        {
          Mandal_Code: '5213',
          MandalName: 'Chapad (చాపాడు)',
        },
        {
          Mandal_Code: '5226',
          MandalName: 'Chennur (చెన్నూరు)',
        },
        {
          Mandal_Code: '5231',
          MandalName: 'Chintha Kommadinne (చింతకొమ్మదిన్నె)',
        },
        {
          Mandal_Code: '5230',
          MandalName: 'Cuddapah (కడప)',
        },
        {
          Mandal_Code: '5203',
          MandalName: 'Duvvur (దువ్వూరు)',
        },
        {
          Mandal_Code: '5211',
          MandalName: 'Gopavaram (గోపవరం)',
        },
        {
          Mandal_Code: '5215',
          MandalName: 'Jammalamadugu (జమ్మలమడుగు)',
        },
        {
          Mandal_Code: '5207',
          MandalName: 'Kalasapadu (కలసపాడు)',
        },
        {
          Mandal_Code: '5224',
          MandalName: 'Kamalapuram (కమలాపురము)',
        },
        {
          Mandal_Code: '5212',
          MandalName: 'Khajipet (ఖాజీపేట)',
        },
        {
          Mandal_Code: '5199',
          MandalName: 'Kondapuram (కొండాపురం)',
        },
        {
          Mandal_Code: '5218',
          MandalName: 'Lingala (లింగాల)',
        },
        {
          Mandal_Code: '5216',
          MandalName: 'Muddanur (ముద్దనూరు)',
        },
        {
          Mandal_Code: '5200',
          MandalName: 'Mylavaram (మైలవరం)',
        },
        {
          Mandal_Code: '5201',
          MandalName: 'Peddamudium (పెద్దముడియం)',
        },
        {
          Mandal_Code: '5244',
          MandalName: 'Penagaluru (పెనగలూరు)',
        },
        {
          Mandal_Code: '5232',
          MandalName: 'Pendlimarri (పెండ్లిమర్రి)',
        },
        {
          Mandal_Code: '5208',
          MandalName: 'Porumamilla (పోరుమామిళ్ల)',
        },
        {
          Mandal_Code: '5214',
          MandalName: 'Proddutur (ప్రొద్దుటూరు)',
        },
        {
          Mandal_Code: '5219',
          MandalName: 'Pulivendla (పులివెందుల)',
        },
        {
          Mandal_Code: '5202',
          MandalName: 'Rajupalem (రాజుపాలెం)',
        },
        {
          Mandal_Code: '5204',
          MandalName: 'S Mydukur (యస్.మైదుకూరు)',
        },
        {
          Mandal_Code: '5206',
          MandalName: 'S.A.K.N. MANDAL (శ్రీ అవధూత కాశినాయన)',
        },
        {
          Mandal_Code: '5229',
          MandalName: 'Sidhout (శిద్దవటం)',
        },
        {
          Mandal_Code: '5217',
          MandalName: 'Simhadripuram (సింహాద్రిపురం)',
        },
        {
          Mandal_Code: '5221',
          MandalName: 'Thondur (తొండూరు)',
        },
        {
          Mandal_Code: '5225',
          MandalName: 'Vallur (వల్లూరు)',
        },
        {
          Mandal_Code: '5222',
          MandalName: 'Veerapunayunipalle (వీరపునాయునిపల్లె)',
        },
        {
          Mandal_Code: '5233',
          MandalName: 'Vempalle (వేంపల్లి)',
        },
        {
          Mandal_Code: '5220',
          MandalName: 'Vemula (వేముల)',
        },
        {
          Mandal_Code: '5228',
          MandalName: 'Vontimitta (ఒంటిమిట్ట)',
        },
        {
          Mandal_Code: '5223',
          MandalName: 'Yerraguntla (యర్రగుంట్ల)',
        },
      ],
    },
  ];
  VilageDetais: any = [
    {
      MandalName: 'Tiruvuru',
      MandalCode: '4997',
      Lgdrvmaster: [
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588965',
          Revenue_Name: 'AKKAPALEM (అక్కపాలెం)',
          Revenue_Name_Tel: 'అక్కపాలెం',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588976',
          Revenue_Name: 'ANJANEYAPURAM (ఆంజనేయపురం)',
          Revenue_Name_Tel: 'ఆంజనేయపురం',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588972',
          Revenue_Name: 'CHINTALAPADU (చింతలపాడు)',
          Revenue_Name_Tel: 'చింతలపాడు',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588975',
          Revenue_Name: 'CHITTELA (చిట్టేల)',
          Revenue_Name_Tel: 'చిట్టేల',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588971',
          Revenue_Name: 'ERRAMADU (యెర్రమాడు)',
          Revenue_Name_Tel: 'యెర్రమాడు',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588974',
          Revenue_Name: 'GANUGAPADU (గానుగపాడు)',
          Revenue_Name_Tel: 'గానుగపాడు',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '909980',
          Revenue_Name: 'Kakarla (కాకర్ల)',
          Revenue_Name_Tel: 'కాకర్ల',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588967',
          Revenue_Name: 'KOKILAMPADU (కోకిలంపాడు)',
          Revenue_Name_Tel: 'కోకిలంపాడు',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588977',
          Revenue_Name: 'LAXMIPURAM (లక్ష్మిపురం)',
          Revenue_Name_Tel: 'లక్ష్మిపురం',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588979',
          Revenue_Name: 'MALLELA (మల్లెల)',
          Revenue_Name_Tel: 'మల్లెల',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588964',
          Revenue_Name: 'MUNUKULLA (మునుకుల్ల)',
          Revenue_Name_Tel: 'మునుకుల్ల',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588970',
          Revenue_Name: 'MUSTIKUNTLA (ముష్టికుంట్ల)',
          Revenue_Name_Tel: 'ముష్టికుంట్ల',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588980',
          Revenue_Name: 'NADIMI TIRUVURU (నడింతిరువూరు)',
          Revenue_Name_Tel: 'నడింతిరువూరు',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588968',
          Revenue_Name: 'PATHA TIRUVURU (U) (పాత తిరువూరు (U))',
          Revenue_Name_Tel: 'పాత తిరువూరు (U)',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588962',
          Revenue_Name: 'PEDDAVARAM (పెద్దవరం)',
          Revenue_Name_Tel: 'పెద్దవరం',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588966',
          Revenue_Name: 'RAJUPETA (రాజుపేట)',
          Revenue_Name_Tel: 'రాజుపేట',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588978',
          Revenue_Name: 'RAMANNAPALEM (రామన్నపాలెం)',
          Revenue_Name_Tel: 'రామన్నపాలెం',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588973',
          Revenue_Name: 'ROLUPADI (రోలుపాడి)',
          Revenue_Name_Tel: 'రోలుపాడి',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588969',
          Revenue_Name: 'VAMAKUNTLA (వామకుంట్ల)',
          Revenue_Name_Tel: 'వామకుంట్ల',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
        {
          District_Code: null,
          District_Name: null,
          District_Name_Tel: null,
          Mandal_Code: null,
          Mandal_Name: null,
          Mandal_Name_Tel: null,
          Revenue_Code: '588963',
          Revenue_Name: 'VAVILALA (వావిలాల)',
          Revenue_Name_Tel: 'వావిలాల',
          Captureby: null,
          CreatedDate: null,
          LastmodifedDate: null,
          Isactive: null,
        },
      ],
    },
  ];
  mandals = [];
  vilage = [];
  newProjectDetails: any;
  newProjectListNames: any;
  newProjectForm: FormGroup = new FormGroup({});
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private commonService: CommonService
  ) {}

  getDistrict(event: any) {
    console.log(event.value.DistrictCode);
    const districtCode = event.value.DistrictCode;
    this.mandals = this.MandalsDetails.find(
      (d: any) => d.DistrictCode === districtCode
    )?.Get_mandals;
  }

  getMandals(event: any) {
    const districtCode = event.value.id;
    this.commonService.getMandals(districtCode).subscribe((data) => {
      this.mandals = data;
    });
  }

  getvilages(event: any) {
    const mandalCode = event.value.id;
    this.commonService.getVillages(mandalCode).subscribe((data) => {
      this.vilage = data;
    });
  }

  getProjectNames(event: any) {
    const projectCategoryCode = event.value.projects;
    this.newProjectListNames = projectCategoryCode;
  }

  ngOnInit() {
    this.productService.getProducts().then((data) => (this.products = data));

    this.statuses = [
      { label: 'New', value: 'New' },
      { label: 'Existing', value: 'Existing' },
      { label: 'Inprogress', value: 'Inprogress' },
    ];

    this.commonService.getProjects().subscribe((data) => {
      // this.products = data;
      console.log('commonService' + data);
    });

    this.commonService.getDistricts().subscribe((data) => {
      this.DistrictDetails = data;
    });

    this.commonService.getNewProjectDetails().subscribe((data) => {
      this.newProjectDetails = data;
    });

    this.newProjectForm = new FormGroup({
      newProjectdistrict: new FormControl(''),
      newProjectmandal: new FormControl(''),
      newProjectvillage: new FormControl(''),
      newProjectCategory: new FormControl(''),
      newProjectListNames: new FormControl(''),
      newProjectDescription: new FormControl(''),
      newProjectLatitude: new FormControl(''),
      newProjectLongitude: new FormControl(''),
      newProjectAddress: new FormControl(''),
      newProjectEstimation: new FormControl(''),
      newProjectGovtShare: new FormControl(''),
      newProjectPublicShare: new FormControl(''),
      newProjectType: new FormControl(''),
      newProjectCommitee: new FormControl(''),
    });
  }

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedProducts() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected products?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter(
          (val) => !this.selectedProducts?.includes(val)
        );
        this.selectedProducts = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Products Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  savenewProjectForm() {
    console.log(this.newProjectForm.value);
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }
}
