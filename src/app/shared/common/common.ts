import { ReportFilterModel } from "src/app/proxy";
import { OrganizationUnitDto } from "src/app/proxy/dto-models";
import { DirectorateType, ObjectionType, ObjectionStatus } from "src/app/proxy/enum";
import { PreparationService } from "../services/preparation.service";

export class Common {

  public static readonly AuditAdmin = 'AuditAdmin';
  public static readonly AuditOfficeAdmin = 'AuditOfficeAdmin';
  public static readonly AuditUser = 'AuditUser';
  public static readonly PermissionCacheKey = '_permission';
  public static readonly defaultDateFormat = 'DD-MM-YYYY';
  public static readonly responseDateFormat = 'YYYY-MM-DD';

  public static ParseDateForUI(inputDate: string): string {
    return (
      new Date(inputDate).getDate() +
      '-' +
      (new Date(inputDate).getMonth() + 1) +
      '-' +
      new Date(inputDate).getFullYear()
    );
  }

  public static getOfficeList(offices: OrganizationUnitDto[], auditAdminOffices: string[]){
    offices = offices.filter(x => auditAdminOffices.some(y => y === x.code));
    return this.processOfficeList(offices);
    // return offices;
  }

  public static processOfficeList(officeList: OrganizationUnitDto[]){
    let newOfficeList: OrganizationUnitDto[] = [];
    let chiefLayer = officeList.find(o => o.layer == 'Chief');
    newOfficeList.push(chiefLayer);

    let zoneLayer = officeList.filter(o => o.layer == 'Zone');
    // this.offices.push(zoneLayer);
    let circleLayer = officeList.filter(o => o.layer == 'Circle');
    let divisionLayer = officeList.filter(o => o.layer == 'Division');

    zoneLayer.forEach(z => {
      newOfficeList.push(z);
      circleLayer.forEach(c => {
        if(c.parentId === z.id){
          newOfficeList.push(c);
          divisionLayer.forEach(d => {
            if(d.parentId === c.id){
              newOfficeList.push(d);
            }
          });
        }
      });
    });

    let notInList = officeList.filter(x => !newOfficeList.map(y=>y.code).includes(x.code));
    notInList.forEach(n => {
      newOfficeList.push(n);
    });

    return newOfficeList;
  }

  public static generateFinancialYears() {
    let allFinancialYears = [];
    for (var i = new Date().getFullYear(); i >= 1972; i--) {
      var y = this.toLocal(i).replace(",", "");
      var ny = this.toLocal(i + 1).replace(",", "");
      var x = { year: i, text: `${y}-${ny}` };
      allFinancialYears.push(x);
    }
    return allFinancialYears;
  }

  private static toLocal(i: any): string {
    return (+i).toLocaleString("bn-BD");
  }

  public static objectionTypes: any[] = [
    {id: 0, name: 'None', label: 'None'},
    {id: 1, name: 'NonSFI', label: 'নন এসএফআই'},
    {id: 2, name: 'SFI', label: 'এসএফআই'},
    {id: 3, name: 'Draft', label: 'রিপোর্টভুক্ত আপত্তি'},
  ];

  public static directorateTypes: any[] = [
    {id: 0, name: 'None', label: 'None'},
    {id: 1, name: 'Audit', label: 'পূর্ত অডিট'},
    {id: 2, name: 'Fapad', label: 'FAPAD'},
  ];

  public static objectionStatusesInBangla : any[] = [
    {id:1, name:'ব্রডশীট জবাব দেয়া হয়নি'},
    {id:2, name:'ব্রডশীট জবাব দেয়া হয়েছে'},
    {id:3, name:'প্রধান প্রকৌশলীর দপ্তর থেকে পুনঃ জবাব চাওয়া হয়েছে'},
    {id:7, name:'মন্ত্রণালয় থেকে পুনঃ জবাব চাওয়া হয়েছে'},
    {id:8, name:'পূর্ত অডিট থেকে পুনঃ জবাব চাওয়া হয়েছে'},
    {id:4, name:'পুনঃ জবাব দেওয়া হয়েছে'},
    {id:5, name:'নিষ্পত্তি করা হয়েছে'},
    {id:6, name:'অন্যান্য'},
  ];

  public static enumToText(type: string, value: number):string{
    if(type === 'directorate')
      // return directorateTypeOptions.find(o => o.value === +value)?.key;
      return this.directorateTypes.find(o => o.id === +value)?.label;
    if(type === 'objection')
      // return objectionTypeOptions.find(o => o.value === +value)?.key;
      return this.objectionTypes.find(o => o.id === +value)?.label;
  }

  public static dateToBengali(dt, showTime: boolean){
    const date = Date.parse(dt);
    // return new Intl.DateTimeFormat('bn-BD', { year: 'numeric', month: 'long', day: 'numeric', dateStyle: 'short' }).format(date);
    if(showTime){
      return new Intl.DateTimeFormat('bn-BD', { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }).format(date);
    }
    return new Intl.DateTimeFormat('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
  }

  public static getOfficeCodeFromOrganizationUnitId(): string{
    let preparationService: PreparationService = new PreparationService();
    let orgUniId = preparationService.posting?.orgUniId;
    let offices = preparationService.offices;
    return offices.find(o => o.id === orgUniId)?.code || '';
  }

  public static getOfficeNameInBengali(officeCode: string){
    let preparationService: PreparationService = new PreparationService();
    let offices = preparationService.offices;
    if (offices.length > 0) {
      let ofc = offices.find((o) => o.code === officeCode);
      if (ofc) return ofc.displayNameBn;
      else return '-';
    }
  }

}
