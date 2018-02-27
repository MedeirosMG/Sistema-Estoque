using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using Utils;

namespace Data
{
    public class Historico_
    {
        [Key]
        public int Id { get; set; }
        
        [AttributeTable]
        public string Historico { get; set; }

        public string Material { get; set; }

        public string Tipo { get; set; }

        public DateTime Data { get; set; }

        public int Quantidade { get; set; }

        [AttributeExcluir]
        public Produtos_ material { get; set; }
    }
}
