import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/db';
import { CategoryModel } from '@/models/category.model';
import { Expense } from '.prisma/client';
import { ItemModel } from '@/models/item.model';
import { endOfDay, startOfDay } from 'date-fns';
type ResponseMessage = { message: string; success: boolean };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CategoryModel | CategoryModel[] | ResponseMessage>
) {
  if (req.method === 'POST') {
    return await createCategory(req, res);
  } else if (req.method === 'GET') {
    return await getCategoriesWithExpenses(req, res);
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
      createdAt: newEntry.createdAt.toISOString(),
      updatedAt: newEntry.updatedAt.toISOString(),
      expenses: mapExpenses(newEntry.expenses),
    });
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ message: 'Error creating category', success: false });
  }
}

async function getCategoriesWithExpenses(req: NextApiRequest, res: NextApiResponse<CategoryModel[] | ResponseMessage>) {
  try {
    const query = req.query as { fromDate?: string; toDate?: string };

    const categories = await prisma.category.findMany({
      include: {
        expenses: {
          where: {
            date: {
              gte: startOfDay(new Date(query.fromDate || '1990-01-01')).toISOString(),
              lte: endOfDay(new Date(query.toDate || '2050-12-31')).toISOString(),
            },
          },
        },
      },
      where: {
        expenses: {
          some: {
            date: {
              gte: startOfDay(new Date(query.fromDate || '1990-01-01')).toISOString(),
              lte: endOfDay(new Date(query.toDate || '2050-12-31')).toISOString(),
            },
          },
        },
      },
    });

    return res.status(200).json(
      categories.map((category) => {
        return {
          ...category,
          createdAt: category.createdAt.toISOString(),
          updatedAt: category.updatedAt.toISOString(),
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
      date: expense.date.toISOString(),
      createdAt: expense.createdAt.toISOString(),
      updatedAt: expense.updatedAt.toISOString(),
    };
  });
}
