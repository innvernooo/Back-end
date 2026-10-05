import express, { Request, Response } from 'express';
import fs from 'fs';

const PORT: number = 8002;

const app = express();
app.use(express.json());

app.post('/api/users', (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const passwordLength = password.toString().length;
    if (passwordLength < 8) {
      throw {
        status: 400,
        message: 'Password must be at least 8 characters long',
      };
    } else if (passwordLength > 15) {
      throw {
        status: 400,
        message: 'Password must be no more than 15 characters long',
      };
    }

    const usersJSON = fs.readFileSync('./src/database/users.json', 'utf-8');
    const users = JSON.parse(usersJSON);

    const cekEmail = users.users.find(
      (user: { email: string }) => user.email === email,
    );
    if (cekEmail) {
      throw { status: 409, message: 'Email already exists' };
    } else {
      users.users.push({ name, email, password });
      fs.writeFileSync('./src/database/users.json', JSON.stringify(users));

      return response.status(201).json({
        success: true,
        message: 'User created successfully',
        data: { name, email, password },
      });
    }
  } catch (error: any) {
    return response.status(error?.status).json({
      success: false,
      message: error?.message,
      data: {},
    });
  }
});

app.get('/api/users', (request: Request, response: Response) => {
  try {
    const usersJSON = fs.readFileSync('./src/database/users.json', 'utf-8');
    const users = JSON.parse(usersJSON);
    return response.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users.users,
    });
  } catch (error: any) {
    return response.status(error?.status).json({
      success: false,
      message: error?.message,
      data: {},
    });
  }
});

app.put('/api/users/:email', (request: Request, response: Response) => {
  try {
    const { email } = request.params;
    const { name, password } = request.body;

    const usersJSON = fs.readFileSync('./src/database/users.json', 'utf-8');
    const users = JSON.parse(usersJSON);

    console.log(users.users);
    const userIndex = users.users.findIndex(
      (user: { email: string }) => user.email === email,
    );

    if (userIndex === -1) {
      throw { status: 404, message: 'User not found' };
    }

    users.users[userIndex] = { ...users.users[userIndex], name, password };
    fs.writeFileSync('./src/database/users.json', JSON.stringify(users));

    return response.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: users.users[userIndex],
    });
  } catch (error: any) {
    return response.status(error?.status).json({
      success: false,
      message: error?.message,
      data: {},
    });
  }
});

app.delete('/api/users/:email', (request: Request, response: Response) => {
  try {
    const { email } = request.params;

    const usersJSON = fs.readFileSync('./src/database/users.json', 'utf-8');
    const users = JSON.parse(usersJSON);

    const userIndex = users.users.findIndex(
      (user: { email: string }) => user.email === email,
    );

    if (userIndex === -1) {
      throw { status: 404, message: 'User not found' };
    }

    users.users.splice(userIndex, 1);
    fs.writeFileSync('./src/database/users.json', JSON.stringify(users));

    return response.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: {},
    });
  } catch (error: any) {
    return response.status(error?.status).json({
      success: false,
      message: error?.message,
      data: {},
    });
  }
});

app.listen(PORT, () => {
  console.log(`Application Running on PORT: ${PORT}`);
});
