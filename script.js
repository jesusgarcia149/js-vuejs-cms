var app = new Vue({
    el: '#app',
    data: {

        templateLogin: true,
        templateMain: false,
        templateAdmin: false,

        username: '',
        admin: 'admin',
        loginText: '',
        adminLogged: false,

        title: '',
        description: '',

        notices: [],
        noticesText: 'the list of notices is empty',
        noticesTextList: 'the list of notices is empty',

        msgVoidView: false,
        msgVoid: 'some field is empty',
        msgCompleteView: false,
        msgComplete: 'notice save successful',

        updateState: false,
        noticeUpdateId: '',
        noticeUpdateTitle : '',
        noticeUpdateDescription: '',
        updateText: '',

        headerUsers: 'Welcome to Blog!',
        headerAdmin: 'Welcome to CMS!',
        footer: 'Created by Jesús García',
        footer1: 'https://www.facebook.com/profile.php?id=100003378198767',
        footer2: 'jesus.g.jg7@gmail.com',
        footer3: 'https://github.com/jesusnaxcs',

        changeMainAdmin: 'Main/Admin <-- Click here to change',

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
                }
                this.loginText = '';
            }else{
                this.loginText = 'some field is empty';
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
        create: function(e){
            e.preventDefault();
            if (this.validationCreate()) {
                this.notices.push({
                    title: this.title,
                    description: this.description,
                    created: new Date()
                });
                this.msgCompleteView = true;
                this.msgVoidView = false;
            }else{
                this.msgVoidView = true;
                this.msgCompleteView = false;
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
                created: new Date()
            }
            this.updateText = '';
            this.noticeUpdateId = '';
            this.noticeUpdateTitle = '';
            this.noticeUpdateDescription = '';
            this.updateState=false;
            this.compNotices();
            }else{
                this.updateText = 'some field is empty';
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
        },//end deleter
        switcher: function(){
            this.templateMain = !this.templateMain;
            this.templateAdmin = !this.templateAdmin;
            this.compNotices();
        },// end switcher
        compNotices: function(){
            if (this.notices.length == 0) {
               this.noticesTextList = 'the list of notices is empty';
            }else{
                this.noticesTextList = '';
            }//end else
        },//end compNotices
    },//end methods
})//end app