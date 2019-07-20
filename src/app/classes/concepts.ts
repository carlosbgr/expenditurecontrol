export interface IConcept {
  _id?: string;
  title?: string;
  isSubConcept?: boolean;
  conceptDependenceId?: string;
  conceptDependeceName?: string;
  isGenericConcept?: boolean;
  conceptOwnerId?: string;
}

export class Concept implements IConcept {
  _id?: string;
  title?: string;
  isSubConcept?: boolean;
  conceptDependenceId?: string;
  isGenericConcept?: boolean;
  conceptOwnerId?: string;

  constructor (_id: string, title: string, isSubConcept: boolean,
               conceptDependenceId: string, isGenericConcept: boolean, birth: Date, conceptOwnerId: string) {
    this._id = _id;
    this.title = title;
    this.isSubConcept = isSubConcept;
    this.conceptDependenceId = conceptDependenceId;
    this.isGenericConcept = isGenericConcept;
    this.conceptOwnerId = conceptOwnerId;
  }

  getId() {
    return this._id;
  }

  getTitle() {
    return this.title;
  }

  getIsSubConcept() {
    return this.isSubConcept;
  }

  getConceptDependenceId() {
    return this.conceptDependenceId;
  }

  getIsGenericConcept() {
    return this.isGenericConcept;
  }

  getConceptOwnerId() {
    return this.conceptOwnerId;
  }

  getUser() {
    return this;
  }
}
