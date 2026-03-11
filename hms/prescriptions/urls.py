from django.urls import path
from .views import PrescriptionListCreateView, PrescriptionDetailView

urlpatterns = [

    path('',PrescriptionListCreateView.as_view()),

    path('<int:pk>/',PrescriptionDetailView.as_view())

]