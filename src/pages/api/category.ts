import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/utils/db';
import { CategoryModel } from '@/models/category.model';
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
    const newEntry = await prisma.category.create({
      data: {
        name: body.name,
        description: body?.description,
      },
    });

    return res.status(200).json({
      ...newEntry,
      expenses: [],
      createdAt: newEntry.createdAt.toDateString(),
      updatedAt: newEntry.updatedAt.toDateString(),
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
          expenses: category.expenses.map((expense) => {
            return {
              ...expense,
              amount: +expense.amount,
              date: expense.date.toDateString(),
              createdAt: expense.createdAt.toDateString(),
              updatedAt: expense.updatedAt.toDateString(),
            };
          }),
        };
      })
    );
  } catch (error) {
    console.error('Request error', error);
    res.status(500).json({ message: 'Error loading categories', success: false });
  }
}
