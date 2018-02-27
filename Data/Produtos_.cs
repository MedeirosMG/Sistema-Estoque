using System;
using System.ComponentModel.DataAnnotations;
using Utils;

namespace Data
{
    public class Produtos_
    {
        [Key]
        public int Id { get; set; }

        [AttributeTable]
        public string Produtos { get; set; }

        public string Nome { get; set; }

        public int Quantidade { get; set; }
    }
}
