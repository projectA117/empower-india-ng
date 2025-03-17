
export class Project {
    id: number;
    projectCategory: string;
    projectType: string;
    status: string;
    location: string;
    latitude: number;
    longitude: number;
    projectEstimation: number;
    governmentShare: number;
    publicShare: number;
    isNew: boolean;
    description: string;
    createdBy: string;
    lastUpdatedBy: string;
    villageName: string;
    mandalName: string;
    districtName: string;
    villageId: number;
    mandalId: number;
    districtId: number;
    projectCategoryId: number;
    projectTypeId: number;


    constructor(model)  {
        this.id = model.id;
        this.projectCategory = model.projectCategory;
        this.projectType = model.projectType;
        this.status = model.status;
        this.location = model.location;
        this.latitude = model.latitude;
        this.longitude = model.longitude;
        this.projectEstimation = model.projectEstimation;
        this.governmentShare = model.governmentShare;
        this.publicShare = model.publicShare;
        this.isNew = model.isNew;
        this.description = model.description;
        this.createdBy = model.createdBy;
        this.lastUpdatedBy = model.lastUpdatedBy;
        this.villageName = model.villageName;
        this.mandalName = model.mandalName;
        this.districtName = model.districtName;
        this.villageId = model.villageId;
        this.mandalId = model.mandalId;
        this.districtId = model.districtId;
        this.projectCategoryId = model.projectCategoryId;
        this.projectTypeId = model.projectTypeId;
    }
}