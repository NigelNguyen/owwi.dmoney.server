import { Request, Response } from "express";

export const tryCatch = (callback: Function) => async (req?: Request, res?: Response) => {
    try {
        await callback(req, res);
    } catch (error) {
        console.error({error});
        return res?.status(500).send('An error occurred');
    }
}