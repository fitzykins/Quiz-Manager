'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const chaiMoment = require('chai-moment');
const mongoose = require('mongoose');
const faker = require('faker');

const {User, Quiz} = require('../models');
const {app, runServer, closeServer} = require('../server.js');

const should = chai.should();
chai.use(chaiHttp);
chai.use(chaiMoment);

function generateUser(){
  userName: 
}