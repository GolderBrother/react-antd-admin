const fakeAuth = {
    // 是否登陆
    isAuthenticated:false,
    //是否注册
    isRegister:false,
    authenticate(cb){
        this.isAuthenticated = true;
        setTimeout(cb,500);
    },
    signOut(cb){
        this.isAuthenticated = false;
        setTimeout(cb,500);
    },
    registerSuccess(cb){
        this.isRegister = true;
        setTimeout(cb,500);
    },
    registerFailed(cb){
        this.isRegister = false;
        setTimeout(cb,500);
    }
}
export default fakeAuth;