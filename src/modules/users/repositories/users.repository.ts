import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from '@prisma/client';

export abstract class UsersRepository {
    abstract create(data:CreateUserDto): Promise<User>
    abstract findAll(): Promise<User[]>
    abstract findOne(id: number): Promise<User>
    abstract findByEmail(email: string): Promise<User>;
    abstract findByCpf(cpf:string): Promise<User>
    abstract update(id: number, data: UpdateUserDto): Promise<User>;
    abstract delete(id: number): Promise<void>;
}