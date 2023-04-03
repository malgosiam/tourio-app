import dbConnect from "../../../../db/connect.js";
import Place from "../../../../db/models/Place.js";

export default async function handler(request, response) {
  await dbConnect();
  const { id } = request.query;

  if (request.method === "GET") {
    const place = await Place.findById(id);

    if (!place) {
      return response.status(404).json({ error: "Not found" });
    }
    return response.status(200).json(place);
  }
  if (request.method === "PATCH") {
    await Place.findByIdAndUpdate(id, { $set: request.body });
    return response.status(200).json({ message: "Place updated" });
  }
  if (request.method === "DELETE") {
    const placetoDelete = await Place.findByIdAndDelete(id);
    response.status(200).json(placetoDelete);
  }
}
