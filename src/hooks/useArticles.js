import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { articlesService } from "../services/articlesService.js";

/**
 * Hook pour récupérer tous les articles
 */
export function useArticles(limit = 10) {
    return useQuery({
        queryKey: ["articles", limit],
        queryFn: () => articlesService.getAll(limit),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
}

/**
 * Hook pour récupérer un article par ID
 */
export function useArticle(id) {
    return useQuery({
        queryKey: ["article", id],
        queryFn: () => articlesService.getById(id),
        enabled: !!id,
        staleTime: 5 * 60 * 1000,
    });
}

/**
 * Hook pour mettre à jour un article
 */
export function useUpdateArticle() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => articlesService.update(id, data),
        onSuccess: (updatedArticle, variables) => {
            // Invalider et mettre à jour le cache
            queryClient.invalidateQueries({ queryKey: ["articles"] });
            queryClient.setQueryData(["article", variables.id], updatedArticle);
        },
    });
}

