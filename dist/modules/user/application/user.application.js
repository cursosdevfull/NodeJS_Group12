"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.UserApplication=void 0;class UserApplication{constructor(e){this.userRepository=e}async create(e){await this.userRepository.save(e)}async update(e){await this.userRepository.save(e)}async delete(e){await this.userRepository.save(e)}async get(e){return await this.userRepository.get(e)}async getAll(){return await this.userRepository.getAll()}async getByPage(e,t){return await this.userRepository.getByPage(e,t)}}exports.UserApplication=UserApplication;