"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UserModelDto=void 0;const user_entity_1=require("../entities/user.entity");class UserModelDto{static fromDomainToData(e){const t=e.properties(),s=new user_entity_1.UserEntity;return s.id=t.id,s.name=t.name,s.lastname=t.lastname,s.email=t.email,s.password=t.password,s.photo=t.photo,s.active=t.active,s.roles=t.roles,s}static fromDataToResponse(e){return Array.isArray(e)?e.map((e=>this.fromDataToResponse(e))):{id:e.id,name:e.name,lastname:e.lastname,email:e.email}}}exports.UserModelDto=UserModelDto;