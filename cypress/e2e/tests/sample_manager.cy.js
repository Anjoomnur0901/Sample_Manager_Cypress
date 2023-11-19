import baseUrl from '../base/base.js'
import loginPage from'../pages/login_page.js'
import Sample_Manager from '../pages/Sample_Manager.js'
describe('Login',() =>{
    const baseurl = new baseUrl()
    const login = new loginPage()
    const sample_manager = new Sample_Manager()
    before('Visit Intellilab',()=>{
        baseurl.visitBaseUrl()
    })
    it('Login Functionality Call', () => {
        
      
        login. provideLoginInformation()
    });
    it('Go to Sample Manager Tab',()=>{
        sample_manager.gotoSampleManager()
    });
    it('Create New Program',()=>{
        sample_manager.createNewProgram()
    })
    it('Create New Project',()=>{
        sample_manager.createNewProject()
    })
    it('Create New Study',()=>{
        sample_manager.createNewStudy()
    })
    it('Upload Manifest',()=>{
        sample_manager.uploadManifest()
    })
    it('Not Received to Damaged',()=>{
        sample_manager.notReceivedtoDamaged()
    })
    it('Config',()=>{
        sample_manager.config()
    })
    it('Not Received to Pending', ()=>{
        sample_manager.notReceivedtoPending()
    })
    it('Accession',()=>{
        sample_manager.accession()
    })
})