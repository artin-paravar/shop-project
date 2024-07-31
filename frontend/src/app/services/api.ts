import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:8000",
});

export async function getProducts() {
  const { data } = await client(`/api/shopitem/list`);
  return data;
}

export async function getProduct(id: string) {
  const { data } = await client(`/api/shopitem/${id}`);
  return data;
}
//react query
export const Productsload = async ({ pageParam }: { pageParam: number }) => {
  const { data } = await client<any>(
    `/api/shopitem/list?page=${pageParam}&limit=4`
  );
  return data;
};
export async function searchandFilterItem(
  { pageParam }: { pageParam: any },
  debounced: string | undefined
) {
  const { data } = await client(
    `/api/shopitem/list?page=${pageParam}&limit=4&&search=${debounced}`
  );
  return data;
}

export async function categoryApi(
  Category: string | null | undefined,
  debounced: string | undefined
) {
  const { data } = await client(
    `/api/shopitem/list?search=${debounced}&&category=${Category}`
  );
  return data;
}
