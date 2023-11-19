const samplelocators = require('../pages/Sample_Manager_locator.json')
const sampledata = require('../data/sample_manager.json')
class Sample_Manager_Page{
    
    gotoSampleManager(){
        
        cy.get(samplelocators.arrow).trigger('mouseover')
        cy.xpath(samplelocators.more).invoke("show").click({ force: true })
        cy.wait(1000)
        cy.xpath(samplelocators.sample_manager).click()
        cy.wait(4000)
        }
    createNewProgram(){
        
        cy.get(samplelocators.program_dashboard).eq(1).click()
        cy.wait(6000)
        cy.xpath(samplelocators.new_ProgBTN).click()
        cy.wait(1000)
        cy.xpath(samplelocators.program_name).type(sampledata.program_name)
        cy.xpath(samplelocators.program_description).type(sampledata.program_description)
        cy.xpath(samplelocators.tag).type(sampledata.tag)
        cy.contains('button', 'Save').click({ force: true })
        cy.reload();
        cy.wait(5000) 
        
        cy.get(samplelocators.top_tabledata).invoke('text').then((actualProgText) => {
            cy.log('Actual Text: ' + actualProgText);
            cy.log('Expected Text: ' + sampledata.program_name);
            expect(actualProgText.trim()).to.equal(sampledata.program_name);
        });
        cy.get(samplelocators.top_tabledata).click();
        cy.wait(6000);
    }
    createNewProject(){

        
        cy.get(samplelocators.new_ProjBTN).click()
        cy.wait(1000)
        cy.xpath(samplelocators.project_name).type(sampledata.project_name)
        cy.xpath(samplelocators.project_description).type(sampledata.project_description)
        cy.xpath(samplelocators.sponsor_protocol_number).type(sampledata.sponsor_protocol_number)
        cy.xpath(samplelocators.tag).type(sampledata.tag)
        cy.contains('button', 'Save').click({ force: true })
        cy.reload();
        cy.wait(5000)
        cy.get(samplelocators.top_tabledata).invoke('text').then((actualProjText) => {
            cy.log('Actual Text: ' + actualProjText);
            cy.log('Expected Text: ' + sampledata.project_name);
            expect(actualProjText.trim()).to.equal(sampledata.project_name);
        });
        cy.get(samplelocators.top_tabledata).click();
        cy.wait(6000);
    }
    createNewStudy(){
        cy.get(samplelocators.new_StudyBTN).click()
        cy.wait(1000)
        cy.xpath(samplelocators.study_name).type(sampledata.study_name)
        cy.xpath(samplelocators.study_description).type(sampledata.study_description)
        cy.contains('button', 'Save').click({ force: true })
        cy.reload();
        cy.wait(5000)
        cy.get(samplelocators.top_tabledata).invoke('text').then((actualStudText) => {
            cy.log('Actual Text: ' + actualStudText);
            cy.log('Expected Text: ' + sampledata.study_name);
            expect(actualStudText.trim()).to.equal(sampledata.study_name);
        });
        cy.get(samplelocators.top_tabledata).click();
        cy.wait(6000)
    }
    uploadManifest(){
        
        
        const filepath = 'Manifest from Gordon.xlsx';
        cy.xpath(samplelocators.upload_manifest).click()
        cy.wait(3000)
        cy.xpath(samplelocators.manifest).attachFile(filepath);
        cy.wait(3000)
    
        cy.xpath(samplelocators.shipment_id).select('Shipment ID');
        cy.wait(1000)
        cy.xpath(samplelocators.status).select('Status');
        cy.wait(1000)
        cy.xpath(samplelocators.sub_id).select('Subject ID');
        cy.wait(1000)
        cy.xpath(samplelocators.alqt_no).select('Aliquot No.');
        cy.wait(1000)
        cy.xpath(samplelocators.sam_id).select('Sample ID');
        cy.wait(1000)
        cy.xpath(samplelocators.barcode).select('Barcode');
        cy.wait(1000)
        cy.xpath(samplelocators.analyte).select('Analyte');
        cy.wait(1000)
        cy.xpath(samplelocators.visit_type).select('Visit Type');
        cy.wait(1000)
        cy.xpath(samplelocators.visit_day).select('Visit Day');
        cy.wait(1000)
        cy.xpath(samplelocators.visit_hours).select('Visit Hours');
        cy.wait(1000)
        cy.xpath(samplelocators.alqt_vol).select('Aliquot Volume');
        cy.wait(1000)
        cy.xpath(samplelocators.vol_unit).select('Aliquot Volume Unit');
        cy.wait(1000)
        cy.xpath(samplelocators.storage_temp).select('Storage Temp.');
        cy.wait(1000)
        cy.xpath(samplelocators.matrix).select('Matrix');
        cy.wait(1000)
        cy.xpath(samplelocators.comment).select('Comment');
        cy.wait(1000)
        cy.xpath(samplelocators.importBTN).should('be.enabled').click();
        cy.wait(10000)
        cy.reload(); 
        
        cy.get(samplelocators.top_tabledata).click({force: true})
        cy.intercept('GET','https://test.intellilab.ca:8080/sampleManifest/count/vial/*')
        cy.intercept('GET','https://test.intellilab.ca:8080/sampleManifest/allData/*')
        cy.wait(5000)
        
    }

    notReceivedtoDamaged(){
      
        cy.xpath(samplelocators.not_received).click()
        cy.intercept('GET','https://test.intellilab.ca:8080/sampleManifest/count/vial/*/Not%20Received')
        cy.wait(6000)
        
        cy.get(samplelocators.sam_1).check()
        cy.get(samplelocators.sam_2).check()
        cy.get(samplelocators.sam_3).check()
        cy.get(samplelocators.sam_4).check()
        cy.get(samplelocators.sam_5).check()
        cy.xpath(samplelocators.change_statusBTN).click()
        cy.wait(5000)

        cy.get(samplelocators.dialog_container)
        .should('be.visible')
        .find(samplelocators.form)
        .within(() => {
        cy.get(samplelocators.choose_status).click()
        cy.xpath(samplelocators.Damaged).click() 
        cy.wait(2000)
        
        })

        cy.get(samplelocators.dialog_container)
        .should('be.visible')
        .find(samplelocators.form_touched)
        .within(() => {
          cy.get(samplelocators.pick_a_comment_input).click({force: true})
          cy.xpath(samplelocators.pcomment).click()
          cy.contains('button', 'Save').click()
        }); 
        cy.wait(5000)
        cy.xpath(samplelocators.damaged_tab).click()
        cy.wait(5000)
      
    }
    config(){
        cy.viewport(1500,660)
        cy.get(samplelocators.program_dashboard).eq(2).click()
        cy.get(samplelocators.arrow).trigger('mouseover')
        cy.xpath(samplelocators.more).invoke("show").click({ force: true })
        cy.wait(2000)
        cy.xpath(samplelocators.config_tab).click({ force: true })
        cy.wait(4000)
        cy.contains(samplelocators.radio_button_config,'Sample Manager').click()
        cy.reload()
        cy.wait(5000)
        cy.get(samplelocators.table).within(() => {
         
            cy.get('tbody > tr:first').within(() => {
            
              cy.get(samplelocators.editBTN).click({ force: true }); 
              cy.wait(3000)
            });
        });
              cy.get(samplelocators.configbox).within(() => {
                cy.wait(2000)
                cy.xpath("//table[@class='table table-scroll']").then(($table) => {
                  if ($table.length > 0 && $table[0].offsetWidth > 0 && $table[0].offsetHeight > 0) {
                  cy.contains('span', 'Sample Id')
                    .closest(samplelocators.property_1)
                    .find('input[class^=\'ng-untouched ng-pristine ng-valid\']')
                    .check();
                
                  cy.contains('span', 'Barcode')
                    .closest(samplelocators.property_2)
                    .find('input[class^=\'ng-untouched ng-pristine ng-valid\']')
                    .check();
                
                  cy.xpath(samplelocators.SaveBtn)
                    .should('be.enabled')
                    .click();
                  cy.wait(5000)
                  cy.log("Sample Id and Barcode have been chosen");
                  cy.reload()
                } else {
                  cy.wait(2000);
                  cy.xpath(samplelocators.close).click();
                  cy.log("Samples Already Chosen");
                  
                }
                })
              });
              
    }
    notReceivedtoPending(){
      cy.get(samplelocators.arrow).trigger('mouseover')
        cy.xpath(samplelocators.more).invoke("show").click({ force: true })
        cy.wait(2000)
        cy.xpath(samplelocators.sample_manager).click()
        cy.wait(5000)
        cy.get(samplelocators.program_dashboard).eq(1).click()
        cy.wait(7000)
        cy.get(samplelocators.top_tabledata).click();
        cy.wait(7000);
        cy.reload();
        cy.wait(5000)
        cy.get(samplelocators.top_tabledata).click();
        cy.wait(7000);
        cy.reload();
        cy.wait(7000)
        cy.get(samplelocators.top_tabledata).click();
        cy.wait(7000);
        cy.reload();
        cy.wait(6000)
        cy.get(samplelocators.top_tabledata).click({force: true})
        cy.intercept('GET','https://test.intellilab.ca:8080/sampleManifest/count/vial/*')
        cy.intercept('GET','https://test.intellilab.ca:8080/sampleManifest/allData/*')
        cy.wait(5000)





      cy.xpath(samplelocators.not_received).click()
        cy.intercept('GET','https://test.intellilab.ca:8080/sampleManifest/count/vial/*/Not%20Received')
        cy.wait(6000)
        
        cy.get(samplelocators.sam_6).check()
        cy.wait(1000)
        cy.get(samplelocators.sam_7).check()
        cy.wait(1000)
        cy.get(samplelocators.sam_8).check()
        cy.wait(1000)
        cy.get(samplelocators.sam_9).check()
        cy.wait(1000)
        cy.get(samplelocators.sam_10).check()
        cy.wait(1000)
        cy.get(samplelocators.sam_11).check()
        cy.wait(1000)
        cy.get(samplelocators.sam_12).check()
        cy.wait(1000)
        cy.get(samplelocators.sam_13).check()
        cy.wait(1000)
        cy.get(samplelocators.sam_14).check()
        cy.wait(1000)
        cy.get(samplelocators.sam_15).check()
        cy.wait(1000)
        cy.xpath(samplelocators.change_statusBTN).click()
        cy.wait(5000)

        cy.get(samplelocators.dialog_container)
        .should('be.visible')
        .find(samplelocators.form)
        .within(() => {
        cy.get(samplelocators.choose_status).click()
        cy.xpath(samplelocators.Pending).click() 
        cy.wait(2000)
        
        })

        cy.get(samplelocators.dialog_container)
        .should('be.visible')
        .within(() => {
          cy.get(samplelocators.receipt_name).type("Anjoom")
          cy.get(samplelocators.storage_condition).eq(2).click()
          cy.get(samplelocators.shipment_condition).eq(0).click()
          cy.get(samplelocators.temperature_control).eq(1).click()
          cy.get(samplelocators.status_upon_receipt).eq(1).click()
          cy.get(samplelocators.express_waybill).eq(1).click()
          cy.get(samplelocators.transfer_form).eq(2).click()
          cy.get(samplelocators.abnormal_situation_record).eq(0).click()
          cy.get(samplelocators.temporary_storage_location).click()
          cy.xpath(samplelocators.location).click()
          cy.get(samplelocators.temporary_storage_sublocation).click()
          cy.xpath(samplelocators.sublocation).click()
          cy.contains('button', 'Generate Receipt').click()
          cy.wait(6000)
        });
    }
    accession(){
      cy.xpath(samplelocators.pending_tab).click({force: true})
      cy.get(samplelocators.group_samples_by_id).trigger('mouseover')
      cy.get(samplelocators.id).invoke("show").find(samplelocators.subject_id).check({force: true})
      cy.contains('button', 'Start Accession').click()
      cy.get(samplelocators.dialog_container)
        .should('be.visible')
        .within(() => {
            cy.contains('button', 'Start Accession').click({force: true}) });
            // Find the element containing the text 'Total Selected Samples:'
            cy.xpath("//h5[contains(text(), 'Total Selected Samples:')]")
            .invoke('text')
            .then((text) => {
            // Extracting the number using regular expression
            const number = parseInt(text.match(/\d+/)[0], 10);
            // Use the 'number' extracted here in your Cypress test
            // For instance, log it or perform actions based on this number
            cy.log(`Extracted number: ${number}`);
            // Perform actions based on the extracted 'number'
              // For example, click a button 'number' times
              if(number>0){
              if(number>1) {
              for (let i = 0; i < number-1; i++) {
                //cy.get('app-sample-accession button.btn.btn-success').debug()
                cy.get(samplelocators.ok_btn).eq(0).should('be.enabled').click({force:true});
                cy.wait(2000)
             }
             cy.get(samplelocators.sam_id_uncheck).eq(0).click()
             cy.get(samplelocators.discrepant_btn).eq(0).should('be.enabled').click({force:true});
            }
           else {
            cy.get(samplelocators.ok_btn).eq(0).should('be.enabled').click({force:true});
           // cy.get('app-sample-accession button.btn.btn-success').trigger('mouseover').click();

             }
            
            cy.get(samplelocators.rt).eq(0).click();
            cy.get(samplelocators.asr).eq(0).click();
            cy.get(samplelocators.Long_term_storage_box).eq(0).click({ force: true });
            cy.xpath(samplelocators.storage_box).click({ force: true })
            cy.wait(2000)
            cy.get(samplelocators.Long_term_storage_box).eq(1).click({ force: true })
            cy.xpath(samplelocators.sub_storage_location).click({ force: true })
            cy.wait(2000)
            cy.xpath(samplelocators.generate_accession_record).should('be.enabled').click({ force: true })

            }
      
});

      

    }
}export default Sample_Manager_Page 