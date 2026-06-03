interface Owner {
    serialNumber: string;
    name:string;
    idNumber: string;
    phoneNumber: string;
    issuanceCountry: string;
    city: string;
    propertyOwnerRepresentive: string;
}
interface Building {
    serialNumber: string;
    name: string;
    number: string;
    type: string;
    numberOfFloors: number;
    numberOfUnitsPerFloor: number;
    numberOfBasements: number;
    address: {
        city: string;
        street: string;
        district: string;
        postalCode: string;
        reigon: string;
    };
    builldingRepresentation: string;

}
interface Unit {
    serialNumber: string;
    type: string;
    name: string;
    number: string;
    status: string;
    buildingName: string;
    unitUsage: string;
    area: number;
    buildingSerialNumber: string;
}

interface Contract {
    id: number;
    createdAt: string;
    updatedAt: string;
    pdfFileName: string;
    
    contract_data: {
      contract_no: string;
      contract_date: string;
      contract_type: string;
      start_date: string;
      end_date: string;
      unit_no: string;
      unit_type: string;
    };
  
    payment_schedule: {
      headers: string[];
      rows: Array<[
        string, // Hijri due date
        string, // Hijri issue date
        Date, // Gregorian due date
        Date, // Gregorian issue date
        string, // Total amount
        string, // Fixed amount
        string, // VAT
        string, // Rent value
        string  // Sequence
      ]>; // Or specify more precise type for rows
    };
  
    representative: {
      ationality: string; // Note: Typo in field name (should be nationality)
      email: string;
      id: string;
      mobile: string;
      name: string;
      type: string;
    };
  
    tenant: {
      company: string;
      cr_no: string;
      date: string;
      issued: string;
      organization: string;
      unified: string;
    };
  
    // Arabic field names
    "اسم المستأجر": {
      value: string;
    };
  
    "اسم الممثل": {
      value: string;
    };
  
    "القيمة الاجمالية للدفعة": {
      value: string;
    };
  
    "تاريخ انتهاء الإيجار": {
      value: string;
    };
  
    "تاريخ بدء الإيجار": {
      value: string;
    };
  
    "رقم الوحدة": {
      value: string;
    };
  
    "عدد دفعات الايجار": {
      value: number;
    };
  }
  interface Property {
    city: string;
    government: string;
    district: string;
    streetNo: string;
    location: string;
  
    propertyOwnerDocs: {
      type: "عقد بيع" | "صك عقار" | "ع";
      releaseDate: string;
      documentNum: string;
      commissionRate: string;
      isTaxable: "نعم" | "لا";
      commercialRecordNum: string;
    };
  
    propertyDetails: {
      propertyType: "شقة" | "فيلا" | "برج";
      purpose: "تجاري" | "سكني" | "عائلي";
      propertyNumber: string;
      buildDate: string;
      totalFloors: number;
      totalUnits: number;
    };
  
    sharedFacilities: {
      parking?: boolean;
      elevators?: boolean;
      secureEntrances?: boolean;
      fitnessCenters?: boolean;
      securityService?: boolean;
      transportationService?: boolean;
      laundryService?: boolean;
      snackRestaurant?: boolean;
      groceryStore?: boolean;
      daycare?: boolean;
      kidsPlayground?: boolean;
      gameRoom?: boolean;
      swimmingPool?: boolean;
      footballField?: boolean;
      basketballCourt?: boolean;
      volleyballCourt?: boolean;
      tennisCourt?: boolean;
      eventHall?: boolean;
      insideCompound?: boolean;
      compoundName?: string;
    };
    // make an interface for property with those {
    //   "\$schema": "[http://json-schema.org/draft-07/schema#](http://json-schema.org/draft-07/schema#)",
    //   "propertyName": "Property",
    //   "type": "object",
    //   "city":"",
    //   "government":"",
    //   "district":"",
    //   "streetNo":"",
    //   "location":"",
    //   "propertyOwnerDocs":{
    //   "type":"عقد بيع || صك عقار || ع",
    //   "releaseDate":"",
    //   "documentNum":"",
    //   "نسبة العمولة"
    //   "خاضع للضريبة":"نعم || لا"
    //   "رقم الجل التجاري":""و
      
    //   ```
    //           }و
    //           "تفاصيل العقار"{
    //               "نوع العقار":"شقة || فيلا || برج",
    //               "الغرض من العقار":"تجاري || سكني || عائلي"
    //               "رقم العقار":""
    //               "تاريخ البناء"
    //               "اجمالي عدد الطوابق"
    //               "اجمالي عدد الوحدات"
    //           }
    //           "مرافق العقار المشتركة":{
    //               "مواقف سيارات"
    //               "مصاعد"
    //               "مداخل امن"
    //               "مراكز لياقة بدنية"
    //               "خدمة الحراسة"
    //               "خدمة النقل"
    //               "مغسلة ملابس"
    //               "مطعم وجبات خفيفة"
    //               "دكان بقالة"
    //               "حضانة اطفال"
    //               "ملعب اطفال "
    //               "صالة العاب"
    //               "حوض سباحة"
    //               "ملعب كرة قدم"
    //               "ملعب كرة سلة"
    //               "ملعب كرة طائرة"
    //               "ملعب كرة مضرب"
    //               "قاعة مناسبات"
    //               "داخل مجمع"
    //               "اسم المجمع"
    //           }
    //   ```
      
    //   }
      
  }
  