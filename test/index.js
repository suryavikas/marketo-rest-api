/*
  Author: Joe Choi <joechoi910@gmail.com>
*/
'use strict';
var expect = require('chai').expect(),
  should = require('chai').should(),
  assert = require('assert'),
  marketo = require('../index'),
  test = require('./test.json');

if (test.clientId==='' || test.clientId==='xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'){
  console.log('To run the proper test, please update all of your Marketo API variables inside "./test/test.json" file.');
  console.log(test);
}

// start test
describe('marketo-rest-api', function() {
 
  // set timeout of each request to 10 seconds
  this.timeout(30000);

  // test init
  describe('marketo.init(options, callback)', function() {
    it('initializing Marketo API with "./test/test.json" data', function(done) {
      assert.doesNotThrow(function() {
        marketo.init(test, function(response){
          response.token.should.be.an('string');
          done();
        }, 
        function(err) {
          if (err) throw err; 
          done(); 
        });
      });
    });
  });  

  // test synLead
  describe('marketo.syncLead(options, callback)', function() {
    
    // test delete lead
    var options = {
      'debug': test.debug,
      'process': 'remove',
      'list': 'listname_1',
      'email': test.email
    };
    it('deleting a lead, ' + JSON.stringify(options), function(done) {
      assert.doesNotThrow(function() {
        marketo.syncLead(options, function(response){
          response.success.should.equal(true);
          done();
        }, 
        function(err) {
          if (err) throw err; 
          done(); 
        });
      });
    });

    // test add lead
    var options = {
      'debug': test.debug,
      'process': 'add',
      'list': 'listname_1',
      'email': test.email, 
      'input': {
        'firstName': 'John',
        'lastName': 'Doe',
        'title': 'Techie',
        'phone': '1112223333',
        'company': 'John Doe Company'
      }
    };
    it('adding a lead, ' + JSON.stringify(options), function(done) {
      assert.doesNotThrow(function() {
        marketo.syncLead(options, function(response){
          response.success.should.equal(true);
          done();
        }, 
        function(err) {
          if (err) throw err; 
          done(); 
        });
      });
    });

    // test update lead
    var options = {
      'debug': test.debug,
      'process': 'update',
      'list': 'listname_1',
      'email': test.email, 
      'input': {
        'firstName': 'John (updated)',
        'lastName': 'Doe (updated)',
        'title': 'Techie (updated)',
        'phone': '4445556666',
        'company': 'John Doe Company (updated)'
      }
    };
    it('updating a lead, ' + JSON.stringify(options), function(done) {
      assert.doesNotThrow(function() {
        marketo.syncLead(options, function(response){
          response.success.should.equal(true);
          done();
        }, 
        function(err) {
          if (err) throw err; 
          done(); 
        });
      });
    });

  });

  // test synLead
  describe('marketo.syncCustomObjects(options, callback)', function() {
    
    var optionsLead = {
        'process': 'update',
        'email': 'marketo.api.test+1@gmail.com', 
        "lookupField": "email",
        'path': 'lead',
        'method': 'POST',
        'process': 'update',
        'lookupField': 'email',
        'input': {
          'firstName': 'Test_jerry',
          'lastName': 'Microsite 13  0917',
          'email': 'marketo.api.test+1@gmail.com',
          'gender': 'Male',
          'dateOfBirth': '1478-09-13',
          'mailingAddress1': '639 Peak Road RD 2 Peak Road',
          'mailingAddress2': 'Helensville',
          'mailingAddress3': 'Helensville',
          'mailingAddress4': '0875',
          'cntracc':'ABCD000291569994'          
        }      
    }
    // test delete lead
    var optionsCustom = {
      'debug': test.debug,
      'process': 'update',
      'path': 'contract_c',
      //"lookupField": "contractNumber",           
      'input':{
        'cntracc': 'ABCD000291569994',
        'icp': '99999999999999999999A',
        'starshipAmount': '20',
        'onlineBillRegd': 'Y',
        'contractNumber':'ABCD000291569994',
        'contractEndDate': '2049-01-01'
      }
      
    };
    // test delete custom object
    var optionsCustomDelete = {
      'debug': test.debug,
      'process': 'remove',
      'path': 'contract_c',
      "lookupField": "dedupeFields",      
      'input':{
        "contractNumber":"ABCD000291569994",
        "contractenddate":"2049-01-01",
        "cntracc":"ABCD000291569994"       
      }
      
    };
    it('creating a lead, ' + JSON.stringify(optionsLead), function(done) {
      assert.doesNotThrow(function() {        
        marketo.syncLead(optionsLead, function(response){
          console.log(response.body);
          response.success.should.equal(true);         
          done();
          
        }, 
        function(err) {
          if (err) throw err; 
          done(); 
        });
      });
    });
    it('creating a custom object, ' + JSON.stringify(optionsCustom), function(done) {
      assert.doesNotThrow(function() {        
        marketo.syncCustomObjects(optionsCustom, function(response){
          console.log(response.body);
          response.success.should.equal(true);         
          done();
        }, 
        function(err) {
          if (err) throw err; 
          done(); 
        });
      });
    });
    it('deleting a custom object, ' + JSON.stringify(optionsLead), function(done) {
      assert.doesNotThrow(function() {        
        marketo.syncCustomObjects(optionsCustomDelete, function(response){
          console.log(response.body);
          response.success.should.equal(true);         
          done();
        }, 
        function(err) {
          if (err) throw err; 
          done(); 
        });
      });
    });
  });
  // test email send
  describe('marketo.sendEmail(options, callback)', function() {
    var options = {
      'debug': test.debug,
      'email': test.email, 
      'campaign': 'campaignname_1'
    };
    it('sending an email, ' + JSON.stringify(options), function(done) {
      assert.doesNotThrow(function() {
        marketo.sendEmail(options, function(response){
          response.success.should.equal(true);
          done();
        }, 
        function(err) {
          if (err) throw err; 
          done(); 
        });
      });
    });
  });  

  // test schedule campaign
  describe('marketo.scheduleCampaign(options, callback)', function() {
    var options = {
      'debug': test.debug,
      'campaign': 'campaignname_2',
      'input': {
        'runAt': '2017-12-25T00:00:00.000Z'
        /*
        // including token examples below
        'tokens': [
          {'name': '{{my.token1_name}}', 'value': 'some value'},
          {'name': '{{my.token2_name}}', 'value': 'some value'}
        ]}
        */
      }
    };
    it('scheduling a campaign, ' + JSON.stringify(options), function(done) {
      assert.doesNotThrow(function() {
        marketo.scheduleCampaign(options, function(response){
          // console.log('scheduleCampaign response', response);
          response.success.should.equal(true);
          done();
        }, 
        function(err) {
          if (err) throw err; 
          done(); 
        });
      });
    });
  });

});

