import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/db';
import { CategoryModel } from '@/models/category.model';
import { Expense } from '.prisma/client';
import { ItemModel } from '@/models/item.model';
type ResponseMessage = { message: string; success: boolean };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CategoryModel | CategoryModel[] | ResponseMessage>
) {
  if (req.method === 'POST') {
    return await createCategory(req, res);
  } else if (req.method === 'GET') {
    return await getCategoriesWithExpenses(res);
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false });
  }
}

async function createCategory(req: NextApiRequest, res: NextApiResponse<CategoryModel | ResponseMessage>) {
  const body = req.body;
  try {
    const newEntry = await prisma.category.upsert({
      include: {
        expenses: true,
      },
      create: {
        name: body.name,
        description: body?.description,
      },
      update: {
        name: body.name,
        description: body?.description,
      },
      where: {
        // Zero is an ID that will not be found, and it will indicate that a new record should be created
        id: body?.id || 0,
      },
    });

    return res.status(200).json({
      ...newEntry,
      createdAt: newEntry.createdAt.toDateString(),
      updatedAt: newEntry.updatedAt.toDateString(),
      expenses: mapExpenses(newEntry.expenses),
    });
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ message: 'Error creating category', success: false });
  }
}

async function getCategoriesWithExpenses(res: NextApiResponse<CategoryModel[] | ResponseMessage>) {
  try {
    const categories = await prisma.category.findMany({
      include: { expenses: true },
    });

    return res.status(200).json(
      categories.map((category) => {
        return {
          ...category,
          createdAt: category.createdAt.toDateString(),
          updatedAt: category.updatedAt.toDateString(),
          expenses: mapExpenses(category.expenses),
        };
      })
    );
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ message: 'Error loading categories', success: false });
  }
}

function mapExpenses(expenses: Expense[]): ItemModel[] {
  return expenses.map((expense) => {
    return {
      ...expense,
      amount: +expense.amount,
      date: expense.date.toDateString(),
      createdAt: expense.createdAt.toDateString(),
      updatedAt: expense.updatedAt.toDateString(),
    };
  });
}
