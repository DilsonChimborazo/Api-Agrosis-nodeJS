from django.db import models
from apps.iot.lote.models import Lote

class Eras(models.Model):
    nombre = models.CharField(max_length=80)
    descripcion = models.TextField()
    fk_id_lote = models.ForeignKey(Lote, on_delete=models.SET_NULL, null=True)
    estado = models.BooleanField(default=True)
    latitud = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)
    longitud = models.DecimalField(max_digits=10, decimal_places=6, null=True, blank=True)




    def __str__(self):
        return f"{self.fk_id_lote.id if self.fk_id_lote else 'Sin Lote'} - {self.descripcion}"