export class AccountRegisterModel {
    constructor(
        public Email: string,
        public Password: string,
        public ConfirmPassword: string,
        public Company: string,
        public FirstName: string,
        public LastName: string,
        public PhoneNumber: string,
        public RedirectUrl: string
    ) { }
}
