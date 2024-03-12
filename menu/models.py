from django.db import models

class Breakfast(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    description= models.TextField(blank=True)
    price= models.DecimalField(max_digits=10, decimal_places=2)
    stock= models.BooleanField(default=False)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} {self.description}"
    
class Lunch(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    description= models.TextField(blank=True)
    price= models.DecimalField(max_digits=10, decimal_places=2)
    stock= models.BooleanField(default=False)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} {self.description}"
    
class Dinner(models.Model):
    name = models.CharField(max_length=200, blank=False, null=False)
    description= models.TextField(blank=True)
    price= models.DecimalField(max_digits=10, decimal_places=2)
    stock= models.BooleanField(default=False)
    image = models.ImageField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} {self.description}"

