import { eq } from "drizzle-orm";
import { db } from "../db/connection";
import { NewUser, User, users } from "../db/schema";
import bcrypt from 'bcrypt';

export const createUser = async (data: NewUser) => {
    // 1 Verificar se o email já existe

    const existingUser = await getUserByEmail(data.email);
    if (existingUser) {
        throw new Error('Email já está em uso.');
        //throw new AppError('Email já está em uso.', 400);
    }

    // 2 Criar hash da senha

    const hashedPassword = await hashPassword(data.password);
    // 3 Salvar no banco de dados

    const newUser: NewUser = {
        ...data,
        password: hashedPassword,
    }
    const result = await db.insert(users).values(newUser).$returningId();
    // 4 Devolver os dados do usuario

    const createdUserId = result[0].id;

    const [createdUser] = await db
        .select()
        .from(users)
        .where(eq(users.id, createdUserId));

    return formatUser(createdUser);
}

// Helper Functions

export const getUserByEmail = async (email: string) => {
    const result = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

    const user = result[0];
    if (!user || user.deletedAt) {
        return null;
    }
    return user;
}

export const hashPassword = async (password: string) => {
    return await bcrypt.hash(password, 10);
}

export const formatUser = (user: User) => {
    const { password, ...userWithoutPassword } = user;

    if (userWithoutPassword.avatar) {
        userWithoutPassword.avatar = `${process.env.BASE_URL}/static/avatars/${userWithoutPassword.avatar}`;
    }
    return userWithoutPassword;
}