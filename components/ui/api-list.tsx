"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";


interface ApiListProps {
  entityName: string
  entityIdName: string
}
const ApiList = ({ entityIdName, entityName }: ApiListProps) => {
  const params = useParams();
  const origin = useOrigin();
  const baseUrl = `${origin}/api/${params.storeId}`
  const apiAlerts: Array<{
    title: string;
    description: string;
    variant: "public" | "admin";
  }> = [
      {
        title: "GET",
        description: `${baseUrl}/${entityName}`,
        variant: "public"
      },
      {
        title: "GET",
        description: `${baseUrl}/${entityName}/{${entityIdName}}`,
        variant: "public"
      },
      {
        title: "POST",
        description: `${baseUrl}/${entityName}`,
        variant: "admin"
      },
      {
        title: "PATCH",
        description: `${baseUrl}/${entityName}/{${entityIdName}}`,
        variant: "admin"
      },
      {
        title: "DELETE",
        description: `${baseUrl}/${entityName}/{${entityIdName}}`,
        variant: "admin"
      }
    ]
  return <>
    {
      apiAlerts.map((apiAlert, index) => (
        <ApiAlert
          key={index}
          title={apiAlert.title}
          description={apiAlert.description}
          variant={apiAlert.variant}
        />
      ))
    }

  </>
}

export default ApiList;