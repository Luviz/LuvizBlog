import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
    switch (req.method?.toLocaleLowerCase()) {
        case "post":
            res.status(201).json({v: "I was posted", body: req.body})
            break;
        case "put":
            res.status(202).json({v: "I was put", body: req.body})
            break;
        case "get":
            res.status(200).json({v: "I was got", body: req.body})
            break;
        default:
            res.status(405).json({Error: "use [GET, POST, PUT]"});
            break;
    }
    // res.status(200).json({ name: 'John Doe' })
}