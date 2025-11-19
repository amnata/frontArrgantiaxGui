import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from '../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'text' | 'quick-reply' | 'info';
}

interface QuickAction {
  icon: string;
  label: string;
  action: string;
}

@Component({
  selector: 'app-chatbot',
    imports: [CommonModule,FormsModule], 
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {
  @ViewChild('messagesContainer') private messagesContainer!: ElementRef;
  
  messages: Message[] = [];
  userMessage: string = '';
  isTyping: boolean = false;
  isChatOpen: boolean = false;
  
  quickActions: QuickAction[] = [
    { icon: '🎤', label: 'Aide vocale', action: 'voice' },
    { icon: '💬', label: 'Consulter aide', action: 'help' },
    { icon: '🚨', label: 'Signaler problème', action: 'report' }
  ];

  quickReplies: string[] = [
    'Comment traiter une maladie ?',
    'Identifier une culture',
    'Suivi de mes plantes',
    'Conseils d\'arrosage'
  ];

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.addWelcomeMessage();
  }

  addWelcomeMessage(): void {
    this.messages.push({
      id: Date.now(),
      text: '👋 Bonjour ! Je suis votre assistant ArrGantiaxGui. Comment puis-je vous aider aujourd\'hui ?',
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    });
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
    if (this.isChatOpen) {
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }

  sendMessage(): void {
    if (!this.userMessage.trim()) return;

    // Ajouter le message de l'utilisateur
    this.messages.push({
      id: Date.now(),
      text: this.userMessage,
      isUser: true,
      timestamp: new Date(),
      type: 'text'
    });

    const userMsg = this.userMessage;
    this.userMessage = '';
    this.scrollToBottom();

    // Simuler la réponse du bot
    this.isTyping = true;
    
    this.chatService.sendMessage(userMsg).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.isTyping = false;
          this.messages.push({
            id: Date.now(),
            text: response.message,
            isUser: false,
            timestamp: new Date(),
            type: 'text'
          });
          this.scrollToBottom();
        }, 1000);
      },
      error: (error) => {
        this.isTyping = false;
        this.messages.push({
          id: Date.now(),
          text: 'Désolé, une erreur est survenue. Veuillez réessayer.',
          isUser: false,
          timestamp: new Date(),
          type: 'text'
        });
        this.scrollToBottom();
      }
    });
  }

  handleQuickReply(reply: string): void {
    this.userMessage = reply;
    this.sendMessage();
  }

  handleQuickAction(action: string): void {
    switch(action) {
      case 'voice':
        this.startVoiceAssistant();
        break;
      case 'help':
        this.showHelp();
        break;
      case 'report':
        this.reportProblem();
        break;
    }
  }

  startVoiceAssistant(): void {
    this.messages.push({
      id: Date.now(),
      text: '🎤 Assistant vocal activé. Parlez maintenant...',
      isUser: false,
      timestamp: new Date(),
      type: 'info'
    });
    this.scrollToBottom();
  }

  showHelp(): void {
    const helpText = `
📚 Aide disponible:
• Détection de maladies des plantes
• Classification des cultures
• Suivi intelligent des cultures
• Conseils d'entretien
• Recommandations personnalisées

Comment puis-je vous aider ?
    `;
    this.messages.push({
      id: Date.now(),
      text: helpText,
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    });
    this.scrollToBottom();
  }

  reportProblem(): void {
    this.messages.push({
      id: Date.now(),
      text: '🚨 Décrivez le problème que vous rencontrez, je transmettrai votre signalement à l\'équipe support.',
      isUser: false,
      timestamp: new Date(),
      type: 'text'
    });
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    setTimeout(() => {
      if (this.messagesContainer) {
        this.messagesContainer.nativeElement.scrollTop = 
          this.messagesContainer.nativeElement.scrollHeight;
      }
    }, 100);
  }

  onKeyPress(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}