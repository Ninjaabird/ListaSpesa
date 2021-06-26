using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using PersonalLibrary.ListaSpesa;
using System.Text.Json;
using System;
using System.Linq;

namespace ListSpesa.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GetAutocompleteItemsController : ControllerBase
    {
        [HttpPost]
        public List<Item> GetAutocompleteItems([FromBody] string input)
        {
            if (HttpContext.Session.GetInt32("logged") == 1)
            {
                return AutocompleteEditor.GetAutocomplete(input);
            }
            else
            {
                HttpContext.Response.StatusCode = 201;
                return new List<Item>();
            }
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class GetAllAutocompleteItemsController : ControllerBase
    {
        [HttpPost]
        public List<Item> GetAllAutocompleteItems()
        {
            if (HttpContext.Session.GetInt32("logged") == 1)
            {
                HttpContext.Response.StatusCode = 200;
                return AutocompleteEditor.GetAllAutocomplete();
            }
            else
            {
                HttpContext.Response.StatusCode = 201;
                return new List<Item>();
            }
        }
    }



    [ApiController]
    [Route("[controller]")]
    public class StoreAutocompleteItemController : ControllerBase
    {
        [HttpPost]
        public long StoreAutocompleteItem([FromBody] JsonElement data)
        {
            try
            {
                Item item = JsonSerializer.Deserialize<Item>(data.GetRawText());

                if (HttpContext.Session.GetInt32("logged") == 1)
                {
                    long res = AutocompleteEditor.StoreAutocomplete(item);
                    if (res > 0)
                    {
                        HttpContext.Response.StatusCode = 200;
                        return res;
                    }
                    else
                    {
                        HttpContext.Response.StatusCode = 202;
                        return res;
                    }
                }
                else
                {
                    HttpContext.Response.StatusCode = 201;
                    return 0;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                HttpContext.Response.StatusCode = 201;
                return 0;
            }
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class EditAutocompleteItemController : ControllerBase
    {
        [HttpPost]
        public bool EditAutocompleteItem([FromBody] JsonElement data)
        {
            try
            {
                Item item = JsonSerializer.Deserialize<Item>(data.GetRawText());

                if (HttpContext.Session.GetInt32("logged") == 1)
                {
                    bool res = AutocompleteEditor.EditAutocomplete(item);
                    if (res)
                    {
                        HttpContext.Response.StatusCode = 200;
                        return res;
                    }
                    else
                    {
                        HttpContext.Response.StatusCode = 202;
                        return res;
                    }
                }
                else
                {
                    HttpContext.Response.StatusCode = 201;
                    return false;
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                HttpContext.Response.StatusCode = 201;
                return false;
            }
        }
    }


    [ApiController]
    [Route("[controller]")]
    public class DeleteAutocompleteItemController : ControllerBase
    {
        [HttpPost]
        public List<bool> DeleteAutocompleteItem([FromBody] long[] data)
        {
            try
            {
                if (HttpContext.Session.GetInt32("logged") == 1)
                {

                    List<bool> res = new List<bool>();
                    foreach (long num in data) res.Add(AutocompleteEditor.DeleteAutocomplete(num));


                    if (res.All(r => r == true))
                    {
                        HttpContext.Response.StatusCode = 200;
                        return res;
                    }
                    else
                    {
                        HttpContext.Response.StatusCode = 202;
                        return res;
                    }
                }
                else
                {
                    HttpContext.Response.StatusCode = 201;
                    return new List<bool>();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                HttpContext.Response.StatusCode = 201;
                return new List<bool>();
            }
        }
    }
}
