var app = new Vue({
    el: '#app',
    data: {

        templateLogin: true,
        templateMain: false,
        templateAdmin: false,

        username: '',
        admin: 'admin',
        loginTextView: false,
        adminLogged: false,

        title: '',
        description: '',

        notices: [],
        
        //Alerts
        alerts: {
            msgLoginView: false,
            msgLoginText: 'some field is empty',

            msgListNoticesVoidMainView: false,
            msgListNoticesVoidMainText: 'the list of notices is empty',

            msgCreateVoidView: false,
            msgCreateVoidText: 'some field is empty ',
            msgCreateSuccessfulView: false,
            msgCreateSuccessfulText: 'notice created successful',

            msgUpdateVoidView: false,
            msgUpdateVoidText: 'some field is empty ',
            msgUpdateSuccessfulView: false,
            msgUpdateSuccessfulText: 'notice updated successful',

            msgDeleteView: false,
            msgDeleteText: 'notice delete successful',

            msgListNoticesVoidAdminView: false,
            msgListNoticesVoidAdminText: 'the list of notices is empty',
        },
        //end Alers

        updateState: false,
        noticeUpdateId: '',
        noticeUpdateTitle : '',
        noticeUpdateDescription: '',

        headerUsers: 'Welcome to Blog!',
        headerAdmin: 'Welcome to CMS!',
        footer: 'Created by Jesús García',
        footer1: 'https://www.facebook.com/profile.php?id=100003378198767',
        footer2: 'jesus.g.jg7@gmail.com',
        footer3: 'https://github.com/jesusnaxcs',

        changeMainAdmin: 'Main/Admin <= Click here to change',

    },//endData
    methods: {
        login: function(e){
            e.preventDefault();
            if (this.validationLogin()){
                this.templateLogin = false;
                this.templateMain = true;
                if (this.username == this.admin) {
                    this.adminLogged = true;
                    this.templateAdmin = false;
                }else{
                    this.adminLogged = false;
                    this.templateAdmin = false;
                }
                this.alerts.msgLoginView = false;
            }else{
                this.alerts.msgLoginView = true;
            }
            this.compNotices();
        },//end login
        validationLogin: function(){
            if (this.username == '') {
                return false;
            }else{
                return true;
            }
        },//end validationLogin
        logout: function(e){

            e.preventDefault();
            this.templateLogin= true;
            this.templateMain= false;
            this.templateAdmin= false;

            this.username= '';
            this.loginText= '';

            this.title= '';
            this.description= '';

            this.updateState= false;
            this.noticeUpdateId= '';
            this.noticeUpdateTitle= '';
            this.noticeUpdateDescription= '';
            this.updateText= '';

        },//end logout
        create: function(e){
            e.preventDefault();
            if (this.validationCreate()) {
                this.notices.push({
                    title: this.title,
                    description: this.description,
                    descriptionView: false,
                    created: new Date()
                });
                this.alerts.msgCreateSuccessfulView = true;
                this.alerts.msgCreateVoidView = false;
                this.alerts.msgDeleteView = false;
                this.alerts.msgUpdateSuccessfulView = false;
                this.alerts.msgUpdateVoidView = false;
                localStorage.setItem('cms-vue-notices', JSON.stringify(this.notices));
            }else{
                this.alerts.msgCreateSuccessfulView = false;
                this.alerts.msgCreateVoidView = true;
                this.alerts.msgDeleteView = false;
                this.alerts.msgUpdateSuccessfulView = false;
                this.alerts.msgUpdateVoidView = false;
            }//end else
            this.title = '';
            this.description = '';
            this.compNotices();
        },//end create
        validationCreate: function(){
            if (this.title == '' || this.description == '') {
                return false;
            }else{
                return true;
            }//endElse
        },//end validationCreate
        update1: function(notice,index){
            this.updateState=true;
            this.noticeUpdateId = notice.index;
            this.noticeUpdateTitle = this.notices[notice.index].title;
            this.noticeUpdateDescription = this.notices[notice.index].description;
            this.compNotices();
        },//end update1
        update2: function(e){
            e.preventDefault();
            if (this.validationUpdate()) {
                this.notices[this.noticeUpdateId] = {
                    title: this.noticeUpdateTitle,
                    description: this.noticeUpdateDescription,
                    descriptionView: false,
                    created: new Date()
                }
                localStorage.setItem('cms-vue-notices', JSON.stringify(this.notices));
                this.updateText = '';
                this.noticeUpdateId = '';
                this.noticeUpdateTitle = '';
                this.noticeUpdateDescription = '';
                this.updateState=false;
                this.compNotices();
                this.alerts.msgCreateSuccessfulView = false;
                this.alerts.msgCreateVoidView = false;
                this.alerts.msgDeleteView = false;
                this.alerts.msgUpdateSuccessfulView = true;
                this.alerts.msgUpdateVoidView = false;
            }else{
                this.alerts.msgCreateSuccessfulView = false;
                this.alerts.msgCreateVoidView = false;
                this.alerts.msgDeleteView = false;
                this.alerts.msgUpdateSuccessfulView = false;
                this.alerts.msgUpdateVoidView = true;
            }//end else
        },//end update2
        validationUpdate: function(){
            if (this.noticeUpdateTitle == '' || this.noticeUpdateDescription == '') {
                return false;
            }else{
                return true;
            }//endElse
        },//end validationUpdate
        deleter: function(index){
            this.notices.splice(index.index,1);
            this.compNotices();
            localStorage.setItem('cms-vue-notices', JSON.stringify(this.notices));
            this.alerts.msgCreateSuccessfulView = false;
            this.alerts.msgCreateVoidView = false;
            this.alerts.msgDeleteView = true;
            this.alerts.msgUpdateSuccessfulView = false;
            this.alerts.msgUpdateVoidView = false;
        },//end deleter
        switcher: function(){
            this.templateMain = !this.templateMain;
            this.templateAdmin = !this.templateAdmin;
            this.compNotices();
        },// end switcher
        compNotices: function(){
            if (this.notices.length == 0) {
               this.alerts.msgListNoticesVoidMainView = true;
               this.alerts.msgListNoticesVoidAdminView = true;
            }else{
                this.alerts.msgListNoticesVoidMainView = false;
                this.alerts.msgListNoticesVoidAdminView = false;
            }//end else
        },//end compNotices
        switchDescriptionView: function(index){
            this.notices[index].descriptionView = !this.notices[index].descriptionView;
            let storage = localStorage.setItem('cms-vue-notices', JSON.stringify(this.notices));
            let datesDB = JSON.parse(localStorage.getItem('cms-vue-notices'));
            this.notices = datesDB;
        },//end switchDescriptionView
    },//end methods
    created: function(){
        let datesDB = JSON.parse(localStorage.getItem('cms-vue-notices'));
        if (datesDB === null) {
            this.notices = [];
        }else{
            this.notices = datesDB;
        }
    },//end created
})//end app