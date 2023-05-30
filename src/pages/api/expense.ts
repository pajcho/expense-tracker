import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/db';
import { ItemModel } from '@/models/item.model';

type ResponseMessage = { message: string; success: boolean };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemModel | ItemModel[] | ResponseMessage>
) {
  if (req.method === 'POST') {
    return await createExpense(req, res);
  } else if (req.method === 'GET') {
    return await getExpensesWithCategories(res);
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}

async function createExpense(req: NextApiRequest, res: NextApiResponse<ItemModel | ResponseMessage>) {
  const body = req.body;
  try {
    const newEntry = await prisma.expense.create({
      data: {
        name: body.name,
        description: body?.description,
        amount: new Prisma.Decimal(body?.amount || Math.random() * 1000),
        categoryId: body?.categoryId || 1,
        date: body?.date || undefined,
      },
    });

    return res.status(200).json({
      ...newEntry,
      amount: +newEntry.amount,
      date: newEntry.date.toDateString(),
      createdAt: newEntry.createdAt.toDateString(),
      updatedAt: newEntry.updatedAt.toDateString(),
    });
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ message: 'Error creating expense', success: false });
  }
}

async function getExpensesWithCategories(res: NextApiResponse<ItemModel[] | ResponseMessage>) {
  try {
    const expenses = await prisma.expense.findMany({
      include: { category: true },
    });

    return res.status(200).json(
      expenses.map((item) => {
        return {
          ...item,
          amount: +item.amount,
          date: item.date.toDateString(),
          createdAt: item.createdAt.toDateString(),
          updatedAt: item.updatedAt.toDateString(),
        };
      })
    );
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ message: 'Error loading expenses', success: false });
  }
}
