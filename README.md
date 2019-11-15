# ng-shared-library
Welcome to the ng-shared-library!

This library contains all common components and function often used in angular projects.



**Steps to add a new component**

* Update version number in projects package.json file.
* Make sure to have a valid token with write permissions in the .npmrc file.
* Use npm publish command in terminal to publish.

***

**Npm install the shared library into a project**

* Use `npm install @teisdbr/ng-shared-library --registry  https://npm.pkg.github.com/` command to install the package.

***

**Dependencies**
* bootstrap 4.3.1
* ngx-bootstrap 5.1.2
* ng-multiselect-dropdown 0.2.5
* jsignature 2.1.3
* zxcvbn 4.4.2
* angular2-text-mask 9.0.0

Note: Make sure to have Angular "Core","Forms" and, "Common" modules are been imported into the module that uses these components.
***

**Component usage**

## Address

#### Usage
`<shr-address [address]="Address" [form]="formGroup" [readonly]="true/false">   </shr-address>`

_Address_ is of type 'Address'. The 'Address' Class is included in this shared library.

## Card

#### Usage
`<shr-card> </shr-card>`


## Checkbox

#### Usage
` <shr-checkbox  [controlId]="'Id'"  [label]="'Name'"  [(checked)]="true/false" > </shr-checkbox>`

## Date

#### Usage

`<shr-date [date]="Date"></shr-date>`


## Date-Range-Picker

#### Usage
`<shr-date-range-picker [cssClasses]="customCssClass" [selectedDateRange]="selectedDateRange" (selectedDateRangeChange)="dateRangeSelectHandler($event)" > </shr-date-range-picker>`

_selectedDateRange_ is a Date array of length 2. Index 0 represents start Date and Index 1 represents 
end Date.


## Date Time Picker

#### Usage
`<shr-date-time-picker [dateValidator]="validatorFn" [IsRequired]="true/false" [showTime]="true/false" [form]="myFormGroup" (dateTimeChanged)="dateTimeChangeHandler($event)"  ></shr-date-time-picker>`

## Fiscal-Year MultiSelect

#### Usage
`<shr-fiscal-year-multiselect [disabled]="true/false"  [selectedValues]="arrayOfTypeString" (change)="yearchangeHandler($event)"> </shr-fiscal-year-multiselect>`

## Fiscal-Year MultiSelect

#### Usage
`<shr-fiscal-year-multiselect [disabled]="true/false"  [selectedValues]="arrayOfTypeString" (change)="yearchangeHandler($event)"> </shr-fiscal-year-multiselect>`

## JSign

#### Usage
`  <shr-jsign [b64signature]="digitalSignature" (b64signatureChanged)="signatureChanged($event)" [readonly]="readonly"></shr-jsign>`

## Parish Select

#### Usage
`<shr-parish [parish]="SelectedParish"
                                  [form]="myFormGroup"(change)="parishChange($event)" [disableNullOption]="true"></shr-parish>`

## Parish Multi-Select

#### Usage
`<shr-parish-multiselect (change)="parishChangeHandler($event)"></shr-parish-multiselect>`

## New Password

#### Usage
`<shr-new-password-input [parentFormGroup]="myFormGroup" id="passwordResetGroup"> </shr-new-password-input>`

## Person 

#### Usage
`<shr-person *ngIf="user" [form]="myRegisterForm" [person]="user" [addressRequired]="false"> </shr-person>` 

_user_ is of type 'User'. The 'User' Class is included in this shared library.

## Region Select

#### Usage
`<shr-region [readonly]="true/false" [form]="myFormGroup" [region]="selectedRegion" (regionChange)="selectedRegion($event)"> </shr-region>`

## Region Multi-Select

#### Usage
`<shr-region [readonly]="true/false" [form]="myFormGroup" [region]="selectedRegion" (regionChange)="selectedRegion($event)"> </shr-region>`

##  Select List

#### Usage
`<shr-select-list [dataList]="ListToDisplay" [selectionProperty]="selectedValues" [buttonDisplayValue]="" (dataSelected)="propertySelectHandler($event)"> </shr-select-list>`

_ListToDisplay_ must be in this format:
{ 
display: string;
 value: string 
}[]


