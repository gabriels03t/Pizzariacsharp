using Microsoft.EntityFrameworkCore;

public static class PizzaApi{


public static void MapPizzaApi(this WebApplication app)
{
    var group = app.MapGroup("/pizzas");

    group.MapGet("/", async (BancoDeDados db) =>
    {
     await db.Pizzas.ToListAsync();
    });

    group.MapPost("/", async (Pizza pizza, BancoDeDados db) =>
    {
        db.Pizzas.Add(pizza);
        await db.SaveChangesAsync();
        return Results.Created($"/pizzas/{pizza.Id}", pizza);
    });

    group.MapPut("/{id}", async (int id, Pizza pizzaAtualizada, BancoDeDados db) =>
    {
        var pizza = await db.Pizzas.FindAsync(id);
        if (pizza == null)
        {
            return Results.NotFound();
        }

        pizza.Nome = pizzaAtualizada.Nome;
        pizza.Ingredientes = pizzaAtualizada.Ingredientes;
        pizza.Valor = pizzaAtualizada.Valor;
        
        await db.SaveChangesAsync();

        return Results.NoContent();
    });

    group.MapDelete("/{id}", async (int id, BancoDeDados db) =>
    {
        var pizza = await db.Pizzas.FindAsync(id);
        if (pizza == null)
        {
            return Results.NotFound();
        }

        db.Pizzas.Remove(pizza);
        await db.SaveChangesAsync();

        return Results.NoContent();
    });
}
}