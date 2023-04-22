import { Expense, Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/db';

type ResponseMessage = { message: string; success: boolean };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Expense | Expense[] | ResponseMessage>
) {
  if (req.method === 'POST') {
    return await createExpense(req, res);
  } else if (req.method === 'GET') {
    return await getExpensesWithCategories(res);
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}

async function createExpense(req: NextApiRequest, res: NextApiResponse<Expense | ResponseMessage>) {
  const body = req.body;
  try {
    const newEntry = await prisma.expense.create({
      data: {
        name: body.name,
        description: body?.description,
        amount: new Prisma.Decimal(body?.amount || Math.random() * 1000),
        categoryId: body?.categoryId || 1,
      },
    });

    return res.status(200).json(newEntry);
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ message: 'Error creating expense', success: false });
  }
}

async function getExpensesWithCategories(res: NextApiResponse<Expense[] | ResponseMessage>) {
  try {
    const expenses = await prisma.expense.findMany({
      include: { category: true },
    });

    return res.status(200).json(expenses);
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ message: 'Error loading expenses', success: false });
  }
}
