import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "./auth.service";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    async validate(email: string, password: string): Promise<any> {
        console.log("validate user in local strategy")
        const user = await this.authService.validateUser(email, password);

        if (!user) {
            throw new UnprocessableEntityException();

        }
        return user;
    }
}
